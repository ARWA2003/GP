
import express from "express";

import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
// Job routes
router.post("/", authMiddleware, createJob); // Create a job
router.get("/", getAllJobs); // Get all jobs
router.get("/:id", getJobById); // Get a single job by ID
router.put("/:id", authMiddleware, updateJob); // Update a job
router.delete("/:id", authMiddleware, deleteJob); // Delete a job

//module.exports = router;
//export default jobRoutes.js;
export default router;