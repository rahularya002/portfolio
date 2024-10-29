import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';

let cachedClient = null;
let cachedDb = null;

// Initialize LRU cache for cached responses
const cache = new LRUCache({
  max: 100, // Maximum items
  maxAge: 1000 * 60 * 60 // 1 hour cache expiration
});

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log('Reusing cached database connection');
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
    });
    const db = client.db('Contacts');
    cachedClient = client;
    cachedDb = db;
    console.log('Database connection established');
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    throw new Error('Database connection failed');
  }
}

export async function POST(req) {
  try {
    const { db } = await connectToDatabase();

    // Parsing the request body
    const { name, email, phone, message } = await req.json();
    console.log('Received request data:', { name, email, phone, message });

    // Validate the incoming request body
    if (!name || !email || !phone || !message) {
      console.error('Request validation failed: missing fields');
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Generate a unique key for the cache
    const cacheKey = `${name}-${email}-${phone}-${message}`;

    // Check if the result is already cached
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      console.log('Returning cached result');
      return NextResponse.json({ message: "Contact saved successfully! (Cached)" }, { status: 201 });
    }

    const collection = db.collection('contacts');
    console.log('Inserting data into the database...');

    // Try to insert the contact into the database with a timeout
    const result = await Promise.race([
      collection.insertOne({ name, email, phone, message, createdAt: new Date() }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Operation timed out')), 9000))
    ]);

    if (result && result.insertedId) {
      // Cache the result after successful insertion
      cache.set(cacheKey, result);
      console.log('Data inserted successfully');
      return NextResponse.json({ message: "Contact saved successfully!" }, { status: 201 });
    }

    console.error('Failed to insert data');
    return NextResponse.json({ message: 'Error saving contact' }, { status: 500 });
  } catch (error) {
    console.error("Error in POST request:", error.message);
    
    // Handle timeouts explicitly
    if (error.message === 'Operation timed out') {
      return NextResponse.json({ message: "Request timed out" }, { status: 408 });
    }

    // Generic error handling for other issues
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('contacts');
    
    // Fetch all contacts from the database
    const contacts = await collection.find({}).toArray();
    
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error.message);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
