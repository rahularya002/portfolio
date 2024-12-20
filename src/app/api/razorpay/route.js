import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Cached database connection
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

// Order Creation Route
export async function POST(req) {
  try {
    const { db } = await connectToDatabase();
    const { email, amount, name, paymentMethod = 'card' } = await req.json();
   
    // Validate the user exists and check current status
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Check if user has already paid
    if (user.paymentStatus === 'paid') {
      return NextResponse.json(
        { message: "User has already completed payment" },
        { status: 400 }
      );
    }
    
    // Use a smaller amount for testing (₹10)
    const testAmount = 199;
   
    const options = {
      amount: testAmount * 100, // amount in paise (₹10)
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1,
    };
    
    const order = await razorpay.orders.create(options);
    
    // Store the order details in Orders collection
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
    
    // Update user's payment status to 'pending'
    await usersCollection.updateOne(
      { email },
      { 
        $set: { 
          paymentStatus: 'pending',
          paymentOrderId: order.id,
          paymentAttemptedAt: new Date()
        } 
      }
    );
    
    // Prepare the response based on payment method
    let response = { ...order };
    if (paymentMethod === 'card') {
      response.testCard = {
        number: '**** **** **** ****',
        expiry: '11/11',
        cvv: '123',
        name: 'Test User'
      };
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error creating payment order:", error);
    return NextResponse.json(
      { message: "Error creating payment order", details: error.message },
      { status: 500 }
    );
  }
}

// Payment Verification Webhook Route
export async function PUT(req) {
  try {
    const { db } = await connectToDatabase();
    const payload = await req.json();
    
    // Extract payment details
    const { order_id, status, payment_id } = payload;

    // Determine order status based on payment status
    let orderStatus, userPaymentStatus;
    switch(status) {
      case 'captured':
        orderStatus = 'paid';
        userPaymentStatus = 'paid';
        break;
      case 'failed':
        orderStatus = 'failed';
        userPaymentStatus = 'failed';
        break;
      default:
        orderStatus = 'pending';
        userPaymentStatus = 'pending';
    }

    // Update order status in Orders collection
    const ordersCollection = db.collection("orders");
    const orderUpdateResult = await ordersCollection.updateOne(
      { orderId: order_id },
      { 
        $set: { 
          status: orderStatus,
          paymentId: payment_id,
          paymentStatus: status,
          updatedAt: new Date() 
        } 
      }
    );

    // Update user's payment status in Users collection
    const usersCollection = db.collection("users");
    const userUpdateResult = await usersCollection.updateOne(
      { paymentOrderId: order_id },
      { 
        $set: { 
          paymentStatus: userPaymentStatus,
          paymentCompletedAt: status === 'captured' ? new Date() : null
        } 
      }
    );

    if (orderUpdateResult.matchedCount === 0 || userUpdateResult.matchedCount === 0) {
      return NextResponse.json(
        { message: "Order or User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Payment status updated successfully",
        orderStatus,
        userPaymentStatus
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing payment webhook:", error);
    return NextResponse.json(
      { message: "Error processing payment webhook", details: error.message },
      { status: 500 }
    );
  }
}