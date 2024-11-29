import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// Global connection and cache management
class DatabaseCache {
  static client = null;
  static db = null;
  static cache = new Map();
  static cacheExpiry = new Map();

  static async connect() {
    if (this.client) return this.client;

    try {
      this.client = await MongoClient.connect(process.env.MONGO_URI2, {
        maxPoolSize: 20,
        minPoolSize: 5,
        socketTimeoutMS: 5000,
        connectTimeoutMS: 5000
      });
      this.db = this.client.db("Blogs");

      // Create indexes for faster querying
      await this.db.collection("blogposts").createIndexes([
        { key: { category: 1 }, name: "category_index" },
        { key: { createdAt: -1 }, name: "creation_date_index" }
      ]);

      return this.client;
    } catch (error) {
      console.error("Database connection failed:", error);
      throw error;
    }
  }

  static setCachedResponse(key, data) {
    // Cache for 60 seconds
    this.cache.set(key, data);
    this.cacheExpiry.set(key, Date.now() + 60000);
  }

  static getCachedResponse(key) {
    const expiry = this.cacheExpiry.get(key);
    if (expiry && Date.now() < expiry) {
      return this.cache.get(key);
    }
    
    // Remove expired cache
    this.cache.delete(key);
    this.cacheExpiry.delete(key);
    return null;
  }

  static clearCache() {
    this.cache.clear();
    this.cacheExpiry.clear();
  }
}

export async function GET(req) {
  try {
    await DatabaseCache.connect();
    
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const category = url.searchParams.get("category");
    const page = Math.max(parseInt(url.searchParams.get("page") || "1"), 1);
    const limit = Math.max(parseInt(url.searchParams.get("limit") || "10"), 1);

    // Create a unique cache key
    const cacheKey = `blogs:${id || 'list'}:${category || 'all'}:${page}:${limit}`;

    // Check cache first
    const cachedResponse = DatabaseCache.getCachedResponse(cacheKey);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse, {
        headers: { 
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=120' 
        }
      });
    }

    const db = DatabaseCache.db;

    if (id) {
      // Fetch single blog post
      const blog = await db.collection("blogposts").findOne(
        { _id: new ObjectId(id) },
        { 
          projection: { 
            content: 0,  // Exclude large content
            images: { $slice: 1 }  // Only first image
          } 
        }
      );

      if (!blog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
      }

      DatabaseCache.setCachedResponse(cacheKey, blog);
      return NextResponse.json(blog);
    } else {
      // Fetch blog list
      const query = category ? { category } : {};
      const [blogs, total] = await Promise.all([
        db.collection("blogposts")
          .find(query)
          .project({ 
            content: 0,  // Exclude full content
            images: { $slice: 1 }  // Only first image
          })
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray(),
        db.collection("blogposts").countDocuments(query)
      ]);

      const response = { 
        blogs, 
        total, 
        page, 
        limit,
        hasMore: total > page * limit 
      };

      DatabaseCache.setCachedResponse(cacheKey, response);
      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("Query error:", error);
    return NextResponse.json(
      { message: "Query failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await DatabaseCache.connect();
    const db = DatabaseCache.db;

    const formData = await req.formData();

    // Minimal validation
    const requiredFields = ["title", "subtitle", "content", "author", "date", "category"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Minimal image processing
    const images = Array.from(formData.entries())
      .filter(([key]) => key.startsWith("image"))
      .map(([, file]) => ({
        name: file.name,
        type: file.type,
        size: file.size
      })).slice(0, 3);  // Limit to first 3 images

    const blogPost = {
      title: formData.get("title"),
      subtitle: formData.get("subtitle"),
      category: formData.get("category"),
      author: { name: formData.get("author") },
      date: new Date(formData.get("date")),
      images,
      createdAt: new Date()
    };

    const result = await db.collection("blogposts").insertOne(blogPost);

    // Clear all cached responses
    DatabaseCache.clearCache();

    return NextResponse.json(
      { message: "Blog Created", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Creation error:", error);
    return NextResponse.json(
      { message: "Creation failed", error: error.message },
      { status: 500 }
    );
  }
}

// Configure Edge Runtime for faster cold starts
export const runtime = 'edge';