// src/app/api/contact/route.js
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

// Handle MongoDB connection
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedConnection = connection;
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return NextResponse.json({ message: "Contact saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ message: "Error saving contact", error: error.message }, { status: 500 });
  } finally {
    // Close the connection after the operation is complete
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }
}
