import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'; // For sending emails

dotenv.config(); // Load environment variables from .env file

// Create Express app
const app = express();

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this based on your email provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
});

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data

// Log MongoDB URI for debugging
console.log('MongoDB URI:', process.env.MONGODB_URI);

// MongoDB connection to 'ss_parking' database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB (ss_parking)");
}).catch((error) => {
    console.error("Error connecting to MongoDB", error.message);
});

// Define schema and model for contact_us
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ }, // Email validation
    message: { type: String, required: true },
}, { collection: 'contact_us' });

const Contact = mongoose.model("Contact", contactSchema);

// Define schema and model for RTO collection
const rtoSchema = new mongoose.Schema({
    plateNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true },
});

const RTO = mongoose.model("RTO", rtoSchema, 'rto'); // Specify the collection name

// Handle POST request to store form data
app.post('/api/contact-us', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save(); // Save contact to the database
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Error submitting contact form' });
    }
});

// Function to find vehicle in the RTO collection
const findVehicleInRto = async (plateNumber) => {
    try {
        const vehicle = await RTO.findOne({ plateno: plateNumber });
        return vehicle;
    } catch (error) {
        console.error('Error finding vehicle in RTO:', error);
        throw new Error('Database query failed');
    }
};

// API endpoint for verifying the plate number and sending OTP
// API endpoint for verifying the plate number and sending OTP
app.post('/api/verify-plate', async (req, res) => {
    let { plateNumber } = req.body;

    console.log("Received plate number:", plateNumber); // Log received plate number
    
    plateNumber = plateNumber.trim(); // Sanitize plate number

    try {
        // Use "plateno" in MongoDB query
        const vehicle = await RTO.findOne({ plateno: plateNumber });
        console.log("Vehicle found:", vehicle); // Log the found vehicle

        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        // Generate and send OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log("Generated OTP:", otp); // Log the generated OTP

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: vehicle.email,
            subject: 'Your OTP for Vehicle Verification',
            text: `Your OTP is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        console.log("OTP sent to email:", vehicle.email); // Log successful email sending

        res.status(200).json({ message: 'OTP sent to email', otp });
    } catch (error) {
        console.error('Error in verification:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



// Start server
const PORT = process.env.PORT || 5000; // Use environment variable for port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
