import mongoose from "mongoose";
import { NextResponse } from 'next/server';

// Define Mongoose schema and model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Global cache for the MongoDB connection
let cachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = {
    conn: null,
    promise: null,
  };
}

// Function to connect to the MongoDB database
async function connectToDatabase() {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cachedConnection.promise = mongoose.connect(process.env.MONGO_URI, options).then((mongoose) => {
      console.log("Connected to MongoDB");
      return mongoose;
    });
  }

  cachedConnection.conn = await cachedConnection.promise;
  return cachedConnection.conn;
}

// POST handler to process form submissions and save to MongoDB
export async function POST(req) {
  try {
    await connectToDatabase(); // Ensure MongoDB connection

    const { name, email, message } = await req.json(); // Parse the incoming request

    // Validate the fields
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Save the contact information in MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Respond with success message
    return NextResponse.json({ message: "Contact saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Error saving contact", error: error.message }, { status: 500 });
  }
}
