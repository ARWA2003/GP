import axios from "axios";

const API_URL = "http://localhost:5002/api"; // Backend URL

// User Signup
export const signup = async (userData) => {
  return axios.post(`${API_URL}/auth/register/deaf`, userData);
};

// User Login
export const login = async (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

// Fetch user profile
export const getUserProfile = async (token) => {
  return axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Send contact message
export const sendContactMessage = async (formData) => {
  return axios.post(`${API_URL}/contact`, formData);
};

// Send contact message
export const sendFeedbackMessage = async (formData) => {
  return axios.post(`${API_URL}/feedback`, formData);
};

