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
export const getContacts = async (token) => {
  return axios.get(`${API_URL}/contacts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Add a new contact
export const addContact = async (token, contactData) => {
  return axios.post(`${API_URL}/contact`, contactData, {
    headers: { 
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};


// Fetch chat history
export const getChatHistory = async (token) => {
  return axios.get(`${API_URL}/chat`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Add a new chat message
export const addChatMessage = async (token, messageData) => {
  return axios.post(`${API_URL}/chat`, messageData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};