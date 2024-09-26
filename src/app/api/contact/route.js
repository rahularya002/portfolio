import { MongoClient } from "mongodb";
import { NextResponse } from 'next/server';

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

    const collection = db.collection('contacts');
    
    const result = await Promise.race([
      collection.insertOne({ name, email, message, createdAt: new Date() }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Operation timed out')), 5000))
    ]);

    if (result.insertedId) {
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
