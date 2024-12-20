const nodemailer = require('nodemailer')

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP host
  port: 587, // Replace with your SMTP port
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable for email
    pass: process.env.EMAIL_PASS  // Use environment variable for password
  }
});

// Define the email options
const mailOptions = {
  from: '"Your Name" <your-email@example.com>',
  to: 'recipient@example.com',
  subject: 'Test Email from Nodemailer',
  text: 'This is a test email sent from Nodemailer.',
  html: `
    <h1>Welcome to Our Newsletter!</h1>
    <p>Dear Subscriber,</p>
    <p>Thank you for joining our mailing list. We're excited to share our latest updates with you!</p>
    <ul>
      <li>New product launches</li>
      <li>Exclusive offers</li>
      <li>Upcoming events</li>
    </ul>
    <p>Stay tuned for more information.</p>
    <p>Best regards,<br>Your Team</p>
  `
};

// Send the email
async function sendEmail() {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Call the function to send the email
sendEmail();