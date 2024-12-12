import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

// Caching setup
let cachedClient = null;
let cachedDb = null;
const cache = new LRUCache({
  max: 100, 
  maxAge: 1000 * 60 * 60, 
});

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: true
  }
});

// Send Welcome Email Function
async function sendWelcomeEmail(email, firstname) {
  try {
    await transporter.verify();
    const mailOptions = {
      from: {
        name: 'AI Workshop',
        address: process.env.SMTP_USER
      },
      to: email,
      subject: 'Welcome to AI Workshop!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4;">
          <div style="background-color: #4A90E2; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to AI Workshop, ${firstname}!</h1>
          </div>
          <div style="padding: 20px; background-color: white;">
            <p style="color: #333; line-height: 1.6;">
              Congratulations on joining our cutting-edge AI Workshop! You're about to embark on an exciting journey into the world of artificial intelligence.
            </p>
            <div style="background-color: #E6F2FF; border-left: 4px solid #4A90E2; padding: 10px; margin: 20px 0;">
              <h2 style="margin: 0 0 10px 0; color: #1A5F7A;">Your Next Steps</h2>
              <ul style="list-style-type: disc; padding-left: 20px; color: #333;">
                <li style="margin-bottom: 5px;">Complete your profile</li>
                <li style="margin-bottom: 5px;">Access workshop materials</li>
                <li style="margin-bottom: 5px;">Connect with fellow AI enthusiasts</li>
              </ul>
            </div>
            <p style="color: #666;">
              We're thrilled to have you join our community of AI innovators. Whether you're a beginner or an experienced professional, there's something new to learn at every turn.
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a 
                href="https://chat.whatsapp.com/Io2sZvQC2Pq5kLZpY8QSmm" 
                target="_blank" 
                style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-bottom: 10px;"
              >
                Join Our WhatsApp Community
              </a>
              <p style="color: #666; font-size: 12px;">
                Click the button above to join our WhatsApp group and stay connected!
              </p>
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; color: #666; font-size: 12px;">
            <p>© 2024 AI Workshop. All rights reserved.</p>
            <p>If you have any questions, contact us at support@aiworkshop.com</p>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error('Detailed error sending welcome email:', error);
    throw error;
  }
}

// Database Connection Function
async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log("Reusing cached database connection");
    return { client: cachedClient, db: cachedDb };
  }
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    const db = client.db("UserDatabase");
    cachedClient = client;
    cachedDb = db;
    console.log("Database connection established");
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    throw new Error("Database connection failed");
  }
}

// Input Validation Function
function validateInput(data) {
  const { firstname, lastname, email, phoneNumber, password } = data;
  
  // Basic validation
  if (!firstname || firstname.length < 2) {
    throw new Error("First name is required and must be at least 2 characters long");
  }
  
  if (!lastname || lastname.length < 2) {
    throw new Error("Last name is required and must be at least 2 characters long");
  }
  
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    throw new Error("Invalid email address");
  }
  
  if (!phoneNumber || !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
    throw new Error("Invalid phone number");
  }
  
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
}

// GET Handler for Retrieving Registrations
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("users");

    const registrations = await collection
      .find({}, { projection: { password: 0 } }) // Exclude password
      .sort({ createdAt: -1 })
      .toArray();

    const formattedRegistrations = registrations.map(reg => ({
      _id: reg._id.toString(),
      firstname: reg.firstname,
      lastname: reg.lastname,
      phoneNumber: reg.phoneNumber,
      email: reg.email,
      createdAt: reg.createdAt,
      paymentStatus: reg.status === 'notPaid' ? 'pending' : 'completed'
    }));

    return NextResponse.json(formattedRegistrations, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// POST Handler for User Signup
export async function POST(req) {
  try {
    const { db } = await connectToDatabase();
    // Parse the request body
    const requestData = await req.json();
    console.log("Received signup data:", requestData);
    
    // Validate input
    try {
      validateInput(requestData);
    } catch (validationError) {
      console.error("Input validation failed:", validationError.message);
      return NextResponse.json(
        { message: validationError.message },
        { status: 400 }
      );
    }
    
    const { firstname, lastname, email, phoneNumber, password } = requestData;
    
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
    console.log("Checking for existing user...");
    
    // Check if the user already exists
    const existingUser = await collection.findOne({ 
      $or: [{ email }, { phoneNumber }] 
    });
    
    if (existingUser) {
      console.error("User already exists with this email or phone number");
      return NextResponse.json(
        { message: "User already exists with this email or phone number" },
        { status: 409 }
      );
    }
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Insert the user into the database with a status of 'notPaid'
    const result = await collection.insertOne({
      firstname,
      lastname,
      phoneNumber,
      email,
      password: hashedPassword,
      status: "notPaid",
      createdAt: new Date(),
    });
    
    if (result && result.insertedId) {
      // Cache the result after successful insertion
      cache.set(cacheKey, result);
      
      // Send welcome email (non-blocking)
      sendWelcomeEmail(email, firstname).catch(error => {
        console.error('Email sending failed:', error);
      });
      
      console.log("User data inserted successfully");
      return NextResponse.json({ 
        message: "User signed up successfully!",
        userId: result.insertedId.toString()
      }, { status: 201 });
    }
    
    console.error("Failed to insert user data");
    return NextResponse.json({ message: "Error signing up user" }, { status: 500 });
  } catch (error) {
    console.error("Error in POST request:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Export additional functions if needed
export { sendWelcomeEmail, connectToDatabase };