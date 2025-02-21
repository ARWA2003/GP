import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const circleAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const VolunteerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Reset link sent to:", email);
    console.log("New password:", formData.password);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full min-h-screen bg-gray-100">
      {/* Motion Circles */}
      <motion.div
        variants={circleAnimation}
        animate="animate"
        className="absolute w-[180px] h-[180px] bg-yellow-200 rounded-full top-[-50px] left-[-50px]"
      ></motion.div>

      <motion.div
        variants={circleAnimation}
        animate="animate"
        className="absolute w-[160px] h-[160px] bg-blue-500 rounded-full bottom-[10px] right-[-40px]"
      ></motion.div>
      {/* Logo */}
      <img src="/assets/logo123.png" alt="HearMeOut Logo" className="w-20 h-20 mx-auto mb-2" />
      {/* Reset Password Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-blue-700 mb-2 text-center">Reset Password</h1>
        <p className="text-gray-600 text-center mb-3 text-sm">
          Enter your email and a new password to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-2">
            <label className="block text-gray-700 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-2 relative">
            <label className="block text-gray-700 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-500 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="mb-2 relative">
            <label className="block text-gray-700 text-sm">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-500 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-2">
          <button
            onClick={() => navigate("/volunteer-login")}
            className="text-blue-500 hover:underline text-sm"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerForgotPassword;
