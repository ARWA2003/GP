
import { Resend } from 'resend';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file

const contactRoutes = express.Router();
// Initialize Resend with API Key
const resend = new Resend(process.env.RESEND_API_KEY);
// Your routes setup
contactRoutes.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await resend.emails.send({
            from:{'email': email},
            to: 'hearmeout918@gmail.com',  // Change to your actual email
            subject: `New Message from ${name}`,
            html: `<p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`
        });

        res.json({ success: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

export default contactRoutes;
