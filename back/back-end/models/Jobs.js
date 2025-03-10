import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({

  job_title: String,
  company: String,
  location: String,
  posted_date: String,
  job_type: String,
  experience_level: String,
  years_of_experience: String,
  category: String,
  skills: String,
});


const Jobs = mongoose.model("jobs", jobSchema);
export default Jobs;