import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        if (!name || !phone || !email || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newFeedback = new Feedback({ name, phone, email, message });
        await newFeedback.save();

        res.json({ success: true, message: "Feedback saved successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
