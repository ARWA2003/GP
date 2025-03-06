import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

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

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
