import axios from "axios";

const API_URL = "http://localhost:5002/api"; // Backend URL

// User Signup
export const signup = async (userData) => {
  return axios.post(`${API_URL}/auth/register/deaf`, userData);
};

export const signupV = async (userData) => {
  return axios.post(`${API_URL}/auth/register/volunteer`, userData);
};

// User Login
export const login = async (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

// Fetch user profile
// export const getUserProfile = async (token) => {
//   return axios.get(`${API_URL}/auth/profile`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// };

// contact us page Send contact message to our email for inquiry
export const sendContactMessage = async (formData) => {
  return axios.post(`${API_URL}/contact`, formData);
};

// contact us page Send contact message to our email for inquiry(footer)
export const sendFeedbackMessage = async (formData) => {
  return axios.post(`${API_URL}/feedback`, formData);
};

