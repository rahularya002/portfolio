import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import LRU from "lru-cache";

// Create LRU cache
const blogCache = new LRU({
  max: 500, // Maximum number of items in cache
  ttl: 1000 * 60, // 1 minute cache duration
  updateAgeOnGet: false
});

// Global connection management
class DatabaseManager {
  static client = null;
  static db = null;

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

      // Create performance indexes
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

  static generateCacheKey(params) {
    return JSON.stringify(params);
  }
}

export async function GET(req) {
  try {
    await DatabaseManager.connect();
    const db = DatabaseManager.db;
    
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const category = url.searchParams.get("category");
    const page = Math.max(parseInt(url.searchParams.get("page") || "1"), 1);
    const limit = Math.max(parseInt(url.searchParams.get("limit") || "10"), 1);

    // Generate cache key
    const cacheParams = { id, category, page, limit };
    const cacheKey = DatabaseManager.generateCacheKey(cacheParams);

    // Check cache
    const cachedResponse = blogCache.get(cacheKey);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse, {
        headers: { 'Cache-Control': 'public, max-age=60' }
      });
    }

    let result;
    if (id) {
      // Fetch single blog post
      result = await db.collection("blogposts").findOne(
        { _id: new ObjectId(id) },
        { 
          projection: { 
            content: 0,  // Exclude large content
            images: { $slice: 1 }  // Only first image
          } 
        }
      );

      if (!result) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
      }
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

      result = { 
        blogs, 
        total, 
        page, 
        limit,
        hasMore: total > page * limit 
      };
    }

    // Cache the response
    blogCache.set(cacheKey, result);

    return NextResponse.json(result);
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
    await DatabaseManager.connect();
    const db = DatabaseManager.db;

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

    // Clear entire cache on new blog post
    blogCache.clear();

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

// Configure Edge Runtime
export const runtime = 'edge';