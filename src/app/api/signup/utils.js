import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";

let cachedClient = null;
let cachedDb = null;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

export async function sendWelcomeEmail(email, firstname) {
  try {
    await transporter.verify();
    const mailOptions = {
      from: {
        name: "AI Workshop",
        address: process.env.SMTP_USER,
      },
      to: email,
      subject: "Welcome to AI Workshop!",
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
              <h2 style="margin: 0 0 10px 0; color: #1A5F7A;">Points to Note</h2>
              <ul style="list-style-type: disc; padding-left: 20px; color: #333;">
              <li style="margin-bottom: 5px;">Join our community</li>
                <li style="margin-bottom: 5px;">Workshop will be held on 26th january at 5:00 pm</li>
                <li style="margin-bottom: 5px;">workshop link will be shared in the community</li>
                <li style="margin-bottom: 5px;">Connect with fellow AI enthusiasts</li>
              </ul>
            </div>
            <p style="color: #666;">
              We're thrilled to have you join our community of AI innovators. Whether you're a beginner or an experienced professional, there's something new to learn at every turn.
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a 
                href="https://chat.whatsapp.com/FUbOKHwiZYPIE5qv2TXKue" 
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
            <p>© 2025 AI Workshop. All rights reserved.</p>
            <p>If you have any questions, contact us at enbquantum@gmail.com </p>
          </div>
        </div>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}

export async function connectToDatabase() {
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
