
import mongoose from "mongoose";

// Subschema for emergency contacts (used by Deaf/Hard of Hearing)
const EmergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
});

const UserSchema = new mongoose.Schema(
  {
    // Either "Deaf/Hard of Hearing" or "Volunteer"
    role: {
      type: String,
      enum: ["Deaf/Hard of Hearing", "Volunteer"],
      required: true,
    },
    // Common fields
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    password: { type: String, required: true },

    // Deaf/Hard of Hearing fields
    emergencyContacts: [EmergencyContactSchema],
    medicalCondition: { type: String },
    bloodType: { type: String },
    medications: { type: String },

    // Volunteer fields
   
    signLanguageLevel: { type: String },
    // e.g., ["Monday", "Wednesday", "Friday"]
    workDays: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
