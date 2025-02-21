// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Server is running on 5002...");
// });

// const PORT = process.env.PORT || 5002;
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// server.js
// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Import routes
// import authRoutes from "./routes/auth.js";
// app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("Server is running on 5002...");
// });

// const PORT = process.env.PORT || 5002;
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // server.js
// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Root route
// app.get("/", (req, res) => {
//   res.send("Server is running on 5002...");
// });

// // Signup route
// app.post("/api/auth/signup", (req, res) => {
//   // Add your signup logic here
//   res.status(201).json({ message: "Signup successful!" });
// });

// // MongoDB connection
// const PORT = process.env.PORT || 5002;
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// // Start the server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./models/user.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contact.js";
import feedbackRoutes from './routes/feedbackRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Server is running on 5002...");
});

// Use auth routes
app.use("/api/auth", authRoutes);
 //send feedback
 // Routes
app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5002;
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
  //Contact us
 // In server.js
app.use('/api', contactRoutes);  // This sets up the route prefix


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
