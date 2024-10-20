import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON data

// MongoDB connection to 'ss_parking' database
mongoose.connect(process.env.MONGODB_URI, { // Use environment variable
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB (ss_parking)");
}).catch((error) => {
    console.error("Error connecting to MongoDB", error.message);
});

// Define schema and model for 'contact_us'
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ }, // Email validation
    message: { type: String, required: true },
}, { collection: 'contact_us' });

const Contact = mongoose.model("Contact", contactSchema);

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

// Start server
const PORT = process.env.PORT || 5000; // Use environment variable for port
app.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});