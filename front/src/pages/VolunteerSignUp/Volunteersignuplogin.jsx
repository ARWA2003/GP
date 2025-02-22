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

const VolunteerSignUp = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // React Router navigation
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    proficiencyLevel: "",
    preferredWork:[],
    role: "Volunteer",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        preferredWork: checked
          ? [...prevState.preferredWork, value]
          : prevState.preferredWork.filter((day) => day !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {

    let newErrors = {};
    if(step===1){
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.dob) newErrors.dob = "Date of birth is required";
      if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
      if (!formData.phone.match(/^\d{10,15}$/)) newErrors.phone = "Invalid phone number";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        newErrors.password = "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol";
      }
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }else if (step === 2) {
      if (!formData.proficiencyLevel) { newErrors.proficiencyLevel = "Please select your sign language proficiency level.";}
      if (formData.preferredWork.length === 0) newErrors.preferredWork = "Please select at least one preferred work day";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  
  };

  const nextStep = () =>{ if (validateForm()) setStep(step + 1);};
  const prevStep = () => setStep(step - 1);

  // const handleSubmit = (e) => {
  //   if (validateForm()){
  //   e.preventDefault();
  //   console.log("Volunteer Sign Up Data:", formData);
  //   navigate("/volunteer-login"); // Redirect to Volunteer Login
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await signup(formData);
        console.log("Volunteer Signup Successful:", response.data);
  
        alert("Signup successful! You can now log in.");
        navigate("/volunteer-login");
      } catch (error) {
        console.error("Signup failed:", error);
        setErrors({ form: error.response?.data?.error || "Signup failed. Please try again." });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <motion.div
        variants={circleAnimation}
        animate="animate"
        className="absolute w-[400px] h-[400px] bg-yellow-200 rounded-full top-[-150px] left-[-150px] shadow-lg"
      ></motion.div>

      <motion.div
        variants={circleAnimation}
        animate="animate"
        className="absolute w-[350px] h-[350px] bg-blue-500 rounded-full bottom-[-100px] right-[-100px]"
      ></motion.div>
       
       {/* Signup Form Container */}
 
       <div className="relative bg-gradient-to-r from-yellow-200 to-blue-500 p-8 rounded-lg shadow-lg z-10 w-full max-w-3xl grid place-items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full place-items-center">
        <img src="../../../public/assets/logo123.png" alt="HearMeOut Logo" className="w-40 h-40" />
        {step === 1 && (
          <>
            {/* "Login Instead?" link only on step 1 */}
            <p className="text-sm text-gray-600 mb-4">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/volunteer-login")}
                className="text-blue-500 hover:underline"
              >
                Login instead
              </button>
            </p>
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Volunteer Sign Up</h1>

            <div className="space-y-4">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.dob && <p className="text-red-500">{errors.dob}</p>}
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded"/>
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                <div className="flex items-center space-x-4">
                  <label className="text-gray-700 font-medium">Gender:</label>
                  <label className="flex items-center">
                  <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} className="mr-2"/>Male</label>
                  <label className="flex items-center">
                  <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} className="mr-2"/>Female</label>
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
            <h1 className="text-2xl font-bold text-blue-700 mb-4 ">Additional information</h1>
            <label className="block text-black mt-4 text-xl mb-2">you sign language level</label>
            <div className="space-y-4"><select name="proficiencyLevel" value={formData.proficiencyLevel} onChange={handleChange} className="w-full p-2 border rounded mb-2">
           <option value="" disabled>Select a level</option>
           <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            </select>
           {errors.proficiencyLevel && <p className="text-red-500">{errors.proficiencyLevel}</p>}
           </div>
           <label className="block text-black mt-4 text-xl mb-2">Preferred Work Days to Offer Help</label>
              <div className="flex flex-col gap-2">
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                  <label key={day} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="preferredWork"
                      value={day}
                      checked={formData.preferredWork.includes(day)}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span>{day}</span>
                  </label>
                ))}
              </div>
              {errors.preferredWork && <p className="text-red-500">{errors.preferredWork}</p>}


              <div className="flex justify-between mt-4">
              <button onClick={prevStep} className="bg-gray-400 text-white p-2 rounded mr-2">Back</button>
              <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded">Submit</button>
            </div>
          </>
        )}

      
      </div>
    </div>
    </div>

  );
};



export default VolunteerSignUp;
