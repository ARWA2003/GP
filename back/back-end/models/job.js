import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: false,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isRemote: {
    type: Boolean,
    default: false,
  },
  skillsRequired: {
    type: [String],
    default: [],
  },
  deadline: {
    type: Date,
    required: false,
  },
});
//const collection = new mongoose.model('Job',JobSchema);
//collection.insertMany(data);
export default mongoose.model("Job", JobSchema);