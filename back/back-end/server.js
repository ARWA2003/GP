import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
//import contactRoutes from "./routes/contact.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import contactRoutes from "./routes/ChatcontactRoutes.js"; // Ensure this import is correct
import jobRoutes from "./routes/jobRoutes.js";
//import jobController ,{ createJob , getAllJobs,getJobById,updateJob,deleteJob} from "../controllers/jobController.js";
//import job from "../models/job.js";
//import jobController from "../controllers/jobController.js"; 
import {createJob} from "./controllers/jobController.js";
import Job from "./models/job.js";
import authMiddleware from './middleware/authMiddleware.js';
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// ✅ Add CORS Middleware HERE
app.use(
  cors({
    origin: "https://localhost:5173", // Allow React frontend to connect
    credentials: true, // Allow cookies/auth headers if needed
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running on 5002...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api", contactRoutes);
app.use("/api/jobs", jobRoutes);
// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

