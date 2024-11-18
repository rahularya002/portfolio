import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
//temp
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
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
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to the database:", error.message);
    throw new Error("Database connection failed");
  }
}

export async function POST(req) {
  try {
    const { db } = await connectToDatabase();
    const { email, amount, name, paymentMethod = 'card' } = await req.json();
   
    // Validate the user exists
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Use a smaller amount for testing (₹10)
    const testAmount = 10;
   
    const options = {
      amount: testAmount * 100, // amount in paise (₹10)
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    };

    // Add UPI-specific options if UPI is selected
    if (paymentMethod === 'upi') {
      options.payment_method = {
        upi: {
          flow: "collect",
          vpa: "", // Will be provided by the user in the frontend
          currency: "INR",
        }
      };
    }

    const order = await razorpay.orders.create(options);

    // Store the order details in MongoDB
    const ordersCollection = db.collection("orders");
    await ordersCollection.insertOne({
      orderId: order.id,
      email,
      amount: testAmount,
      status: "created",
      createdAt: new Date(),
      name,
      paymentMethod,
      isTestOrder: true,
    });

    // Prepare the response based on payment method
    let response = { ...order };

    if (paymentMethod === 'card') {
      response.testCard = {
        number: '**** **** **** ****',
        expiry: '11/11',
        cvv: '123',
        name: 'Test User'
      };
    } else if (paymentMethod === 'upi') {
      response.testUpi = {
        vpa: 'success@razorpay',  // Test VPA for successful payments
        name: 'Test User'
      };
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating payment order:", error);
    return NextResponse.json(
      { message: "Error creating payment order" },
      { status: 500 }
    );
  }
}