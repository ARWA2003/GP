import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Add useNavigate
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { getJobs } from "../../../api";

const JobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Add navigate hook
  const job = location.state?.job;

  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all jobs to populate related jobs
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

  // Filter related jobs (e.g., same category, excluding the current job)
  const relatedJobs = allJobs
    .filter(
      (relatedJob) =>
        relatedJob._id !== job?._id &&
        relatedJob.category === job?.category
    )
    .slice(0, 3);

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
            The job you&apos;re looking for could not be found. Please go back to the job listings.
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
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
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
          <p style={{ color: "#4b5563", marginBottom: "16px" }}>
            {job.description || "No description available for this job."}
          </p>

          {/* Responsibilities */}
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "16px",
            }}
          >
            Responsibilities
          </h3>
          <ul
            style={{
              color: "#374151",
              marginTop: "8px",
              paddingLeft: "20px",
              listStyleType: "disc",
            }}
          >
            {job.responsibilities?.length > 0 ? (
              job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))
            ) : (
              <li>No responsibilities listed.</li>
            )}
          </ul>

          {/* Requirements */}
          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "16px",
            }}
          >
            Requirements
          </h3>
          <ul
            style={{
              color: "#374151",
              marginTop: "8px",
              paddingLeft: "20px",
              listStyleType: "disc",
            }}
          >
            {job.requirements?.length > 0 ? (
              job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))
            ) : (
              <li>No requirements listed.</li>
            )}
          </ul>

          <button
            type="button" // Add type attribute for semantics
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

        {/* Sidebar */}
        <aside
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Summary</h3>
          <p style={{ color: "#374151", marginTop: "8px" }}>
            <strong>Job Category:</strong> {job.category || "N/A"}
          </p>
          <p style={{ color: "#374151" }}>
            <strong>Job Setup:</strong> {job.job_type || "N/A"}
          </p>
          <p style={{ color: "#374151" }}>
            <strong>Employment Type:</strong> {job.job_type || "N/A"}
          </p>
          <p style={{ color: "#374151" }}>
            <strong>Location:</strong> {job.location || "N/A"}
          </p>

          <h3
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginTop: "24px",
            }}
          >
            Related Jobs
          </h3>
          <div style={{ marginTop: "16px" }}>
            {loading ? (
              <p style={{ color: "#4b5563" }}>Loading related jobs...</p>
            ) : error ? (
              <p style={{ color: "#4b5563" }}>{error}</p>
            ) : relatedJobs.length > 0 ? (
              relatedJobs.map((relatedJob, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #e5e7eb",
                    padding: "12px",
                    borderRadius: "6px",
                    marginBottom: "8px",
                    backgroundColor: "white",
                    transition: "background-color 0.3s ease, transform 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "#facc15";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onClick={() =>
                    navigate("/job-details", { state: { job: relatedJob } })
                  }
                >
                  <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {relatedJob.job_title}
                  </p>
                  <p style={{ color: "#4b5563" }}>
                    {relatedJob.salary
                      ? `${relatedJob.salary}/mo`
                      : "Salary N/A"}
                  </p>
                  <p style={{ color: "#9ca3af", fontSize: "14px" }}>
                    {relatedJob.posted_date || "Date N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ color: "#4b5563" }}>No related jobs found.</p>
            )}
          </div>
        </aside>
      </div>
      <Foooter />
    </div>
  );
};

export default JobDetails;