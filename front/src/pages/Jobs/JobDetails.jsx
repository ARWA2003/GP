import { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { getJobs } from "../../../api";

const JobDetails = () => {
  const location = useLocation();

  const job = location.state?.job;

  const [ setAllJobs] = useState([]);
  const [ setLoading] = useState(true);
  const [ setError] = useState(null);

  // Fetch all jobs (previously used for related jobs, now can be removed if not needed)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setAllJobs(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch related jobs.");
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // If no job data is passed, show a fallback
  if (!job) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
        <Upperbar />
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <h2
            style={{ fontSize: "24px", fontWeight: "bold", color: "#374151" }}
          >
            Job Not Found
          </h2>
          <p style={{ color: "#4b5563", marginTop: "8px" }}>
            The job youre looking for could not be found. Please go back to the job listings.
          </p>
        </div>
        <Foooter />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <Upperbar />
      {/* Main Content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "24px",
        }}
      >
        {/* Job Details */}
        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            {job.job_title || "N/A"}
          </h2>
          <p style={{ color: "#4b5563", marginBottom: "8px" }}>
            <strong>Company:</strong> {job.company || "N/A"}
          </p>
          <p style={{ color: "#4b5563", marginBottom: "8px" }}>
            <strong>Location:</strong> {job.location || "N/A"}
          </p>
          <p style={{ color: "#4b5563", marginBottom: "8px" }}>
            <strong>Posted Date:</strong> {job.posted_date || "N/A"}
          </p>
          <p style={{ color: "#4b5563", marginBottom: "8px" }}>
            <strong>Job Type:</strong> {job.job_type || "N/A"}
          </p>
          <p style={{ color: "#4b5563", marginBottom: "8px" }}>
            <strong>Experience Level:</strong> {job.experience_level || "N/A"}
          </p>
          <p style={{ color: "#4b5563", marginBottom: "8px" }}>
            <strong>Category:</strong> {job.category || "N/A"}
          </p>
          <p style={{ color: "#4b5563", marginBottom: "8px" }}>
            <strong>Skills:</strong> {job.skills || "N/A"}
          </p>

          <button
            type="button"
            style={{
              marginTop: "24px",
              backgroundColor: "#facc15",
              color: "black",
              width: "100%",
              padding: "12px",
              fontWeight: "bold",
              borderRadius: "8px",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              border: "none",
              cursor: "pointer",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#eab308";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#facc15";
              e.target.style.transform = "scale(1)";
            }}
          >
            Apply for this position
          </button>
        </div>
      </div>
      <Foooter />
    </div>
  );
};

export default JobDetails;