import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';

// Global cached connection
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(); // Replace with the specific database name if needed

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function POST(req) {
  try {
    const { db } = await connectToDatabase(); // Get the database connection

    const { name, email, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Insert data into the database
    const collection = db.collection('contacts');
    await collection.insertOne({ name, email, message, createdAt: new Date() });

    return NextResponse.json({ message: "Contact saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Error saving contact", error: error.message }, { status: 500 });
  }
}
