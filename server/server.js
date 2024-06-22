const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnection = require('./database/db');
const authRoute = require('./routes/auth-routes');
const createpostroutes = require('./routes/createpost-routes');
const errorMiddleware = require('./middlewares/error-middleware');
const contactRoute = require('./routes/contact-routes');
const adminRoute = require('./routes/admin-routes');
const nodemailer = require('nodemailer');
const path = require('path');


// Define the absolute path to the uploads folder
const uploadsPath = path.join(__dirname, 'uploads');


dotenv.config();

dbConnection();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use('/api', createpostroutes);
app.use("/api/admin", adminRoute);
app.use('/api/form', contactRoute);


app.use(errorMiddleware);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


app.post('/api/subscribe', (req, res) => {
  const { email, name } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to:process.env.GMAIL_USERs, 
    subject: 'New Subscription',
    text: `New subscription received!\n\nName: ${name}\nEmail: ${email}  ${ Math.floor(Math.random() * 1000000)}`,
    // Attachments example:
    attachments: [
      {
        filename: "cv-1711269912093.pdf",
        path: path.join(uploadsPath, 'cv-1711269912093.pdf'), // Absolute path to the file
        contentType: "application/pdf"
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Internal server error' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Subscription successful' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
