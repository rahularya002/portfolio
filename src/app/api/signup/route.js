import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase, sendWelcomeEmail } from "./utils";
import { LRUCache } from "lru-cache";

const cache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60,
});

function validateInput(data) {
  const { firstname, lastname, email, phoneNumber } = data;
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
  // if (!password || password.length < 8) {
  //   throw new Error("Password must be at least 8 characters long");
  // }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const ordersCollection = db.collection("orders");
    const usersCollection = db.collection("users");

    // Get all orders
    const orders = await ordersCollection
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    // Create an array of promises to fetch user data for each order
    const formattedRegistrations = await Promise.all(
      orders.map(async (reg) => {
        // Find the user associated with this order
        const user = await usersCollection.findOne(
          { email: reg.email },
          { projection: { phoneNumber: 1 } }
        );

        return {
          id: reg._id.toString(),
          name: reg.name,
          email: reg.email,
          amount: reg.amount,
          paymentMethod: reg.paymentMethod,
          createdAt: reg.createdAt,
          paymentStatus: reg.status === "created" ? "pending" : "completed",
          phoneNumber: user?.phoneNumber || null, // Add phone number from user collection
        };
      })
    );

    return NextResponse.json(formattedRegistrations, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    const { db } = await connectToDatabase();
    const requestData = await req.json();
    validateInput(requestData);
    const { firstname, lastname, email, phoneNumber, password } = requestData;
    const cacheKey = `${firstname}-${email}`;
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return NextResponse.json({ message: "User signed up successfully! (Cached)" }, { status: 201 });
    }
    const collection = db.collection("users");
    const existingUser = await collection.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email or phone number" }, { status: 409 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
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
      cache.set(cacheKey, result);
      sendWelcomeEmail(email, firstname).catch(error => console.error("Email sending failed:", error));
      return NextResponse.json({ message: "User signed up successfully!", userId: result.insertedId.toString() }, { status: 201 });
    }
    return NextResponse.json({ message: "Error signing up user" }, { status: 500 });
  } catch (error) {
    console.error("Error in POST request:", error.message);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
