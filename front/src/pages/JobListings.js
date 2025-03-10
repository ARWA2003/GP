// frontend/src/pages/JobListings.js
import  { useEffect, useState } from "react";
import jobService from "../services/jobService";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await jobService.getJobs();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h1>Job Opportunities</h1>
      {jobs.map((job) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <p>{job.description}</p>
        </div>
      ))}
    </div>
  );
};

export default JobListings;