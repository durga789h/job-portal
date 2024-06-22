const nodemailer = require('nodemailer');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL/TLS
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Function to send welcome back email upon user login
async function sendWelcomeBackEmail(email) {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Welcome Back to Our Website',
      text: 'Welcome back! We missed you.',
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome back email sent successfully');
  } catch (error) {
    console.error('Error sending welcome back email:', error);
    throw error;
  }
}

module.exports = { sendWelcomeBackEmail };
