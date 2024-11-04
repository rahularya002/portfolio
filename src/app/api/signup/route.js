import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

let cachedClient = null;
let cachedDb = null;

// Initialize LRU cache for cached responses
const cache = new LRUCache({
  max: 100, // Maximum items
  maxAge: 1000 * 60 * 60, // 1-hour cache expiration
});

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log("Reusing cached database connection");
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
    });
    const db = client.db("UserDatabase"); // Change the database name if needed
    cachedClient = client;
    cachedDb = db;
    console.log("Database connection established");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    throw new Error("Database connection failed");
  }
}

// POST handler for user signup
export async function POST(req) {
  try {
    const { db } = await connectToDatabase();

    // Parse the request body
    const { firstname, lastname, email, password } = await req.json();
    console.log("Received signup data:", { firstname, lastname, email, password });

    // Validate the incoming request body
    if (!firstname || !lastname || !email || !password) {
      console.error("Request validation failed: missing fields");
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Generate a unique key for caching the response
    const cacheKey = `${firstname}-${email}`;

    // Check if the result is already cached
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      console.log("Returning cached result");
      return NextResponse.json(
        { message: "User signed up successfully! (Cached)" },
        { status: 201 }
      );
    }

    const collection = db.collection("users");
    console.log("Inserting user data into the database...");

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      console.error("User already exists with this email");
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );
    }

    // Insert the user into the database with a timeout
    const result = await Promise.race([
      collection.insertOne({ firstname, lastname, email, password, createdAt: new Date() }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Operation timed out")), 9000)
      ),
    ]);

    if (result && result.insertedId) {
      // Cache the result after successful insertion
      cache.set(cacheKey, result);
      console.log("User data inserted successfully");
      return NextResponse.json({ message: "User signed up successfully!" }, { status: 201 });
    }

    console.error("Failed to insert user data");
    return NextResponse.json({ message: "Error signing up user" }, { status: 500 });
  } catch (error) {
    console.error("Error in POST request:", error.message);

    // Handle timeouts explicitly
    if (error.message === "Operation timed out") {
      return NextResponse.json({ message: "Request timed out" }, { status: 408 });
    }

    // Generic error handling for other issues
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// GET handler for fetching all users (Optional)
export async function GET(req) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("users");

    // Fetch all users from the database
    const users = await collection.find({}).toArray();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}