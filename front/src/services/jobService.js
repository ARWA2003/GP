
import axios from "axios";

const API_URL = "/api/jobs";

// Fetch all jobs
const getJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single job by ID
const getJobById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export default {
  getJobs,
  getJobById,
};