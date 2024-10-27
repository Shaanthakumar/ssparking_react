import express from "express";
import pkg from 'pg';
const { Pool } = pkg;
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Test the PostgreSQL connection
pool.connect((err) => {
  if (err) {
    console.error("Error connecting to PostgreSQL", err);
  } else {
    console.log("Connected to PostgreSQL (ss_parking)");
  }
});

// Handle POST request to store contact form data
app.post('/api/contact-us', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = "INSERT INTO contact_us (name, email, message) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, email, message];
    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Contact form submitted successfully', data: result.rows[0] });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: 'Error submitting contact form' });
  }
});

// Function to find vehicle in the RTO table
const findVehicleInRto = async (plateNumber) => {
  try {
    const result = await pool.query("SELECT * FROM rto WHERE plate_number = $1", [plateNumber]);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding vehicle in RTO:", error);
    throw new Error("Database query failed");
  }
};

// API endpoint for verifying the plate number and sending OTP
// API endpoint for verifying the plate number and sending OTP
app.post('/api/verify-plate', async (req, res) => {
    let { plateNumber } = req.body;
    plateNumber = plateNumber.trim();
  
    try {
      const vehicle = await findVehicleInRto(plateNumber);
      if (!vehicle) {
        return res.status(404).json({ message: "Vehicle not found" });
      }
  
      // Generate and send OTP
      const otp = Math.floor(100000 + Math.random() * 900000);
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: vehicle.email_id, // Use the correct column name
        subject: "Your OTP for Vehicle Verification",
        text: `Your OTP is: ${otp}\n\n` +
              `Vehicle Name: ${vehicle.vehicle_name}\n` +  // Include vehicle name
              `Owner Name: ${vehicle.owner_name}`          // Include owner name
      };
  
      await transporter.sendMail(mailOptions);
      console.log("OTP sent to email:", vehicle.email_id); // Use the correct column name
  
      res.status(200).json({ message: "OTP sent to email", otp });
    } catch (error) {
      console.error("Error in verification:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
