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

// Send contact message
export const sendContactMessage = async (formData) => {
  return axios.post(`${API_URL}/contact`, formData);
};

// Send contact message
export const sendFeedbackMessage = async (formData) => {
  return axios.post(`${API_URL}/feedback`, formData);
};



//related to chats and contacts of tts:

// Fetch contacts
export const getContacts = async () => {
  const email = localStorage.getItem("userEmail"); // Get email from local storage
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

export const getDeafUserProfile = async (email) => {
  return axios.get(`http://localhost:5002/api/auth/deaf/profile/${email}`);
};
export const getVOLUserProfile = async (email) => {
  return axios.get(`http://localhost:5002/api/auth/volunteer/profile/${email}`);
};

