
import job from "../models/job.js";
//   Create a new job

const createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary, isRemote, skillsRequired, deadline } =
      req.body;
    const postedBy = req.user.id;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      postedBy,
      isRemote,
      skillsRequired,
      deadline,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//   Get all jobs

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single job by ID

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email");
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a job

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the user is the owner of the job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//   Delete a job

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the user is the owner of the job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.remove();
    res.status(200).json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
};