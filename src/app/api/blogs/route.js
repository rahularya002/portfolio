const { NextResponse } = require("next/server");
const { MongoClient, ObjectId } = require("mongodb");

// Caching the database client for connection reuse
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI2, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedClient = client;
    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    throw new Error("Database connection failed");
  }
}

// POST: Create a new blog post
export async function POST(req) {
  try {
    const client = await connectToDatabase();
    const db = client.db("Blogs");

    const formData = await req.formData();

    // Extract fields
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const content = formData.get("content");
    const authorName = formData.get("author");
    const date = formData.get("date");
    const category = formData.get("category");

    // Validate required fields
    if (!title || !subtitle || !content || !authorName || !date || !category) {
      return NextResponse.json(
        { message: "All fields are required: title, subtitle, content, author, date, category" },
        { status: 400 }
      );
    }

    // Process images
    const images = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("image")) {
        const file = value;
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        images.push({
          name: file.name,
          type: file.type,
          data: `data:${file.type};base64,${base64}`,
        });
      }
    }

    // Create the blog post object
    const blogPost = {
      title,
      subtitle,
      content,
      category,
      date: new Date(date),
      author: { name: authorName, image: "", bio: "" },
      images,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert the blog post into the database
    const result = await db.collection("blogposts").insertOne(blogPost);

    return NextResponse.json(
      { message: "Blog Saved Successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/blogs:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// GET: Retrieve blog posts or a single post by ID
export async function GET(req) {
  try {
    const client = await connectToDatabase();
    const db = client.db("Blogs");

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const page = Math.max(parseInt(url.searchParams.get("page") || "1", 10), 1);
    const limit = Math.max(parseInt(url.searchParams.get("limit") || "10", 10), 1);
    const skip = (page - 1) * limit;
    const category = url.searchParams.get("category");

    if (id) {
      // Fetch a single blog post by ID
      const blog = await db.collection("blogposts").findOne({ _id: new ObjectId(id) });
      if (!blog) {
        return NextResponse.json({ message: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    } else {
      // Fetch all blog posts with optional category filter
      const query = category ? { category } : {};
      const blogs = await db
        .collection("blogposts")
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      const total = await db.collection("blogposts").countDocuments(query);

      return NextResponse.json({ blogs, total, page, limit });
    }
  } catch (error) {
    console.error("Error in GET /api/blogs:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
