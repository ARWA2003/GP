import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { signup } from "../../../api";
const circleAnimation = {
  animate: {
    y: [0, -20, 0], // Moves up and down
    scale: [1, 1.1, 1], // Subtle scaling
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

// Common medical conditions
const medicalConditionList = [
  "None",
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Allergies",
  "Epilepsy",
  "Arthritis",
  "Cancer",
  "Thyroid Disorder",
  "Other",
];

// Blood types
const bloodTypeList = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const DeafSignUp = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    gender: "",
    emergencyContacts: [{ name: "", phoneNumber: "", relationship: "" }],
    medicalCondition: "",
    bloodType: "",
    medications: "",
    role: "Deaf/Hard of Hearing",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "medicalCondition" && value !== "Other") {
      setFormData({ ...formData, medicalCondition: value, otherMedicalCondition: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleEmergencyContactChange = (index, e) => {
    const { name, value } = e.target;
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index][name] = value;
    setFormData({ ...formData, emergencyContacts: updatedContacts });
  };

  const addEmergencyContact = () => {
    if (formData.emergencyContacts.length < 3) {
      setFormData({
        ...formData,
        emergencyContacts: [...formData.emergencyContacts, { name: "", phoneNumber: "", relationship: "" }],
      });
    }
  };

  // Function to delete an emergency contact
  const deleteEmergencyContact = (index) => {
    if (formData.emergencyContacts.length > 1) {
      const updatedContacts = formData.emergencyContacts.filter((_, i) => i !== index);
      setFormData({ ...formData, emergencyContacts: updatedContacts });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
      if (!formData.phoneNumber.match(/^\d{10,15}$/)) newErrors.phoneNumber = "Invalid phoneNumber number";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol";
      }
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    } else if (step === 2) {
      formData.emergencyContacts.forEach((contact, index) => {
        if (!contact.name) newErrors[`emergencyContactName${index}`] = "Name is required";
        if (!contact.phoneNumber.match(/^\d{10,15}$/)) newErrors[`emergencyContactphoneNumber${index}`] = "Invalid phoneNumber number";
        if (!contact.relationship) newErrors[`emergencyContactRelationship${index}`] = "Relationship is required";
      });
      

      if (!formData.medicalCondition) newErrors.medicalCondition = "Medical conditions are required";
      if (!formData.bloodType) newErrors.bloodType = "Blood type is required";
      if (!formData.medications) newErrors.medications = "Medications are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateForm()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     console.log("Form Data:", formData);
  //     navigate("/deaf-login");
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const finalMedicalCondition = formData.medicalCondition === "Other"
    ? formData.otherMedicalCondition
    : formData.medicalCondition;

  const submissionData = { ...formData, medicalCondition: finalMedicalCondition };

  console.log("Submitting:", submissionData); // Debugging

  try {
    const response = await signup(submissionData);
    console.log("Signup successful:", response);
    navigate("/deaf-login");
  } catch (error) {
    console.error("Signup failed:", error);
    setErrors({ general: error.response?.data?.message || "Signup failed. Please try again." });
  }
};

  

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      {/* Animated Circles */}
      <motion.div variants={circleAnimation} animate="animate"
        className="absolute w-[400px] h-[400px] bg-yellow-200 rounded-full top-[-150px] left-[-150px] shadow-lg"
      ></motion.div>

      <motion.div
        variants={circleAnimation}
        animate="animate"
        className="absolute w-[350px] h-[350px] bg-blue-500 rounded-full bottom-[-100px] right-[-100px]"
      ></motion.div>

      {/* Signup Form Container */}
      <div className="relative bg-gradient-to-r from-yellow-200 to-blue-500 p-8 rounded-lg shadow-lg z-10 w-full max-w-3xl grid place-items-center">
        <div className="relative bg-white p-8 rounded-lg shadow-lg z-10 w-full max-w-3xl grid place-items-center">
          <img src="../../../public/assets/logo123.png" alt="HearMeOut Logo" className="w-40 h-40" />
          {step === 1 && (
            <>
              <p className="text-center mt-5">
                Already have an account?{" "}
                <a href="/deaf-login" className="text-blue-500 hover:underline">
                  Log in
                </a>
              </p>
              <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Sign Up</h1>
              <div className="space-y-4">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.dob && <p className="text-red-500">{errors.dob}</p>}
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <input type="tel" name="phoneNumber" placeholder="phoneNumber Number" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                <div className="flex items-center space-x-4">
                  <label className="text-gray-700 font-medium">Gender:</label>
                  <label className="flex items-center">
                    <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} className="mr-2" />Male
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} className="mr-2" />Female
                  </label>
                </div>
                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                <input type="password" name="password" placeholder="Password :Must be at least 8 characters, contain uppercase, lowercase, number, and symbol" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              <button onClick={nextStep} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200 mt-4">
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Emergency & Medical Info</h1>
              <div className="space-y-4 w-full">
                {formData.emergencyContacts.map((contact, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-lg font-semibold">Emergency Contact {index + 1}</h3>
                    <input type="text" name="name" placeholder="Name" value={contact.name} onChange={(e) => handleEmergencyContactChange(index, e)} className="w-full p-2 border rounded" />
                    {errors[`emergencyContactName${index}`] && <p className="text-red-500 text-sm">{errors[`emergencyContactName${index}`]}</p>}
                    <input type="tel" name="phoneNumber" placeholder="phoneNumber Number" value={contact.phoneNumber} onChange={(e) => handleEmergencyContactChange(index, e)} className="w-full p-2 border rounded" />
                    {errors[`emergencyContactphoneNumber${index}`] && <p className="text-red-500 text-sm">{errors[`emergencyContactphoneNumber${index}`]}</p>}
                    <input type="text" name="relationship" placeholder="Relationship" value={contact.relationship} onChange={(e) => handleEmergencyContactChange(index, e)} className="w-full p-2 border rounded" />
                    {errors[`emergencyContactRelationship${index}`] && <p className="text-red-500 text-sm">{errors[`emergencyContactRelationship${index}`]}</p>}
                    {/* Add a delete button for contacts except the first one */}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => deleteEmergencyContact(index)}
                        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
                      >
                        Delete Contact
                      </button>
                    )}
                  </div>
                ))}
                {formData.emergencyContacts.length < 3 && (
                  <button type="button" onClick={addEmergencyContact} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200">
                    Add Another Emergency Contact
                  </button>
                )}

                {/* Medical Conditions Dropdown */}
                <select
                  name="medicalCondition"
                  value={formData.medicalCondition}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Medical Condition</option>
                  {medicalConditionList.map((condition, index) => (
                    <option key={index} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
                {errors.medicalCondition && <p className="text-red-500 text-sm">{errors.medicalCondition}</p>}

                {/* Conditional Input for "Other" Medical Condition */}
                {formData.medicalCondition === "Other" && (
                  <input
                    type="text"
                    name="otherMedicalCondition"
                    placeholder="Please specify your medical condition"
                    value={formData.otherMedicalCondition || ""}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mt-2"
                  />
                )}

                {/* Blood Type Dropdown */}
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Blood Type</option>
                  {bloodTypeList.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.bloodType && <p className="text-red-500 text-sm">{errors.bloodType}</p>}

                <input type="text" name="medications" placeholder="Medications" value={formData.medications} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.medications && <p className="text-red-500 text-sm">{errors.medications}</p>}
              </div>
              <div className="flex justify-between w-full mt-4">
                <button onClick={prevStep} className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition duration-200">
                  Back
                </button>
                <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200">
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeafSignUp;