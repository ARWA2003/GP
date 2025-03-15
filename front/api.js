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

// Send contact message
export const sendContactMessage = async (formData) => {
  return axios.post(`${API_URL}/contact`, formData);
};

// Send feedback message
export const sendFeedbackMessage = async (formData) => {
  return axios.post(`${API_URL}/feedback`, formData);
};

// Fetch contacts
export const getContacts = async () => {
  const email = localStorage.getItem("userEmail");
  return axios.get(`${API_URL}/contacts`, { params: { email } });
};

// Add a new contact
export const addContact = async (contactData) => {
  const email = localStorage.getItem("userEmail");
  return axios.post(`${API_URL}/contact`, { ...contactData, email });
};

// Fetch chat history
export const getChatHistory = async (contactName) => {
  const email = localStorage.getItem("userEmail");
  return axios.get(`${API_URL}/chat`, { params: { contactName, email } });
};

// Add a new chat message
export const addChatMessage = async (messageData) => {
  const email = localStorage.getItem("userEmail");
  console.log("Calling API:", `${API_URL}/chat`);
  return axios.post(`${API_URL}/chat`, { ...messageData, email });
};

// Delete a contact
export const deleteContact = async (contactName) => {
  const email = localStorage.getItem("userEmail");
  return axios.delete(`${API_URL}/contact`, { params: { contactName, email } });
};

// Fetch user profiles
export const getDeafUserProfile = async (email) => {
  return axios.get(`${API_URL}/auth/deaf/profile/${email}`);
};

export const getVOLUserProfile = async (email) => {
  return axios.get(`${API_URL}/auth/volunteer/profile/${email}`);
};

// Fetch job listings
// api.js
// Ensure axios is imported

export const getJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs`);
  return response.data; // Return only the data array
};

export const getPlaces = async () => {
  const response = await axios.get(`${API_URL}/places`);
  return response.data; // Return only the data array
};

export const getBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data; // Return only the data array
};

export const getBank = async () => {
  try {
    const response = await axios.get(`${API_URL}/bankjob`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bank jobs:", error);
    throw error; // Let the caller handle the error
  }
};