import express from "express";
import User from "../models/user.js"; // Import User Schema
import bcrypt from "bcryptjs"; // For password hashing
import jwt from "jsonwebtoken"; // For authentication
import dotenv from "dotenv"; // Load environment variables

dotenv.config();
const router = express.Router();

// ---------------------- REGISTER DEAF/HARD OF HEARING ----------------------
router.post("/register/deaf", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      gender,
      password,
      emergencyContacts,
      medicalCondition,
      bloodType,
      medications,
    } = req.body;

    // Check required fields
    if (!firstName || !email || !password) {
      return res.status(400).json({ error: "firstName, email, and password are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new Deaf/Hard of Hearing User
    const newUser = new User({
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      gender,
      password: hashedPassword,
      emergencyContacts,
      medicalCondition,
      bloodType,
      medications,
      role: "Deaf/Hard of Hearing",
    });

    await newUser.save();

    res.status(201).json({
      message: "Deaf/Hard of Hearing user registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during Deaf user registration:", error);
    res.status(500).json({ error: error.message });
  }
  
});

// ---------------------- REGISTER VOLUNTEER ----------------------
router.post("/register/volunteer", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // 👈 Log the request body

    const {
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      gender,
      password,
      signLanguageLevel,
      workDays,
    } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({ error: "firstName, email and password are required." });
    }

    console.log("Checking if user exists..."); // 👈 Debug log
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists!"); // 👈 Debug log
      return res.status(400).json({ error: "User with this email already exists." });
    }

    console.log("Hashing password..."); // 👈 Debug log
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Creating new user..."); // 👈 Debug log
    const newUser = new User({
      firstName,
      lastName,
      birthDate,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      signLanguageLevel,
      workDays,
      role: "Volunteer",
    });

    console.log("Saving user to database..."); // 👈 Debug log
    await newUser.save();

    console.log("User created successfully!"); // 👈 Debug log
    res.status(201).json({
      message: "Deaf/Hard of Hearing user registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Signup Error:", error.message); // 👈 Catch and log errors
    res.status(500).json({ error: error.message });
  }
});


// ---------------------- LOGIN (For Both Roles) ----------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Backend: Express Route (Node.js)
router.get("/deaf/profile/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log("Fetching profile for:", email); // Debugging

    const deafUser = await User.findOne({ email }).select("-password"); 

    if (!deafUser) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    res.json(deafUser);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/volunteer/profile/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log("Fetching profile for:", email); // Debugging

    const VUser = await User.findOne({ email }).select("-password"); 

    if (!VUser) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Retrieved User Data:", VUser); // Debugging
    res.json(VUser);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});



export default router;