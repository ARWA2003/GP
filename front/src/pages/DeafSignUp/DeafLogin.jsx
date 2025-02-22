import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../../../api";

const circleAnimation = {
  animate: {
    y: [0, -20, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const VolunteerLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   setLoading(true);
  //   setTimeout(() => {
  //     console.log("Logging in as Deaf:", formData);
  //     navigate("/Deafhomepage");
  //     setLoading(false);
  //   }, 2000);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    
    try {
      const response = await login(formData); // Call the API function
  
      if (response?.data) {
        const { token, user } = response.data;
  
        // Store token in localStorage or session
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", user.role);
  
        console.log("Login successful:", user);
  
        // Navigate based on role
        if (user.role === "Deaf/Hard of Hearing") {
          navigate("/Deafhomepage");
        } else if (user.role === "Volunteer") {
          navigate("/Volunteerhomepage");
        } else {
          console.error("Unknown user role:", user.role);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ form: error.response?.data?.error || "Login failed. Please try again." });
    } finally {
      setLoading(false);
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

    
      <div className="relative bg-gradient-to-r from-yellow-200 to-blue-500 p-8 rounded-lg shadow-lg z-10 w-full max-w-3xl grid place-items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <img src="../../../public/assets/logo123.png" alt="HearMeOut Logo" className="w-40 h-40 mx-auto" />

          <h1 className="text-2xl font-bold text-blue-700 mb-4">Login</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          <button
            onClick={handleSubmit}
            className={`w-full text-white p-2 rounded mt-2 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-between mt-4 text-sm">
            <button className="text-blue-500 hover:underline" onClick={() => navigate("/deaf-forgot-password")}>
              Forgot Password?
            </button>
            <button className="text-blue-500 hover:underline" onClick={() => navigate("/deaf-signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerLogin;
