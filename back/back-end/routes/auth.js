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
      role: "Deaf/Hard of Hearing",
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
    });

    await newUser.save();

    res.status(201).json({
      message: "Deaf/Hard of Hearing user registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------------- REGISTER VOLUNTEER ----------------------
router.post("/register/volunteer", async (req, res) => {
  try {
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

    // Create new Volunteer User
    const newUser = new User({
      role: "Volunteer",
      firstName,
      lastName,
      birthDate,
      email,
      phoneNumber,
      gender,
      password: hashedPassword,
      signLanguageLevel,
      workDays,
    });

    await newUser.save();

    res.status(201).json({
      message: "Volunteer registered successfully",
      user: newUser,
    });
  } catch (error) {
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

export default router;
