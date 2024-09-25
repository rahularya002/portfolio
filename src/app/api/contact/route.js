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
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
console.log("Connected to MongoDB");

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return NextResponse.json({ message: "Contact saved successfully!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving contact", error: error.message }, { status: 500 });
  }
}
