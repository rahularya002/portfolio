import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

let cachedClient = null;
let cachedDb = null;

// Initialize LRU cache
const cache = new LRUCache({
  max: 100, // Maximum number of items to store in the cache
  maxAge: 1000 * 60 * 60 // Cache expiration time (1 hour)
});

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }
  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
  });
  const db = client.db('Contacts');
  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

export async function POST(req) {
  try {
    const { db } = await connectToDatabase();

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Generate a unique key for the cache
    const cacheKey = `${name}-${email}-${message}`;

    // Check if the result is already in the cache
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return NextResponse.json({ message: "Contact saved successfully! (Cached)" }, { status: 201 });
    }

    const collection = db.collection('contacts');
    
    const result = await Promise.race([
      collection.insertOne({ name, email, message, createdAt: new Date() }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Operation timed out')), 9000)) // Increased timeout to 9 seconds
    ]);

    if (result.insertedId) {
      // Store the result in the cache
      cache.set(cacheKey, result);
      return NextResponse.json({ message: "Contact saved successfully!" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    if (error.message === 'Operation timed out') {
      return NextResponse.json({ message: "Request timed out" }, { status: 408 });
    }
    return NextResponse.json({ message: "Error saving contact", error: error.message }, { status: 500 });
  }
}
