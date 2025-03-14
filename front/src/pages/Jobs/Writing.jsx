import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

function JobCard({ job }) {
  return (
    <div className="p-5 bg-white text-blue-700 rounded-lg shadow-lg border border-blue-300">
      <h2 className="text-xl font-bold">{job["Job Title"]}</h2>
      <p className="text-sm">{job["Company"]}</p>
      <p>{job["Location"]}</p>
      <p>{job["Job Type"]} - {job["Workplace"]}</p>
      <p>Experience: {job["Experience"] || "Not specified"}</p>
      <a
        href={job["Job Link"]}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 bg-blue-700 text-white p-2 rounded-lg text-center transition-transform transform hover:scale-105"
      >
        Apply Now
      </a>
    </div>
  );
}

JobCard.propTypes = {
  job: PropTypes.shape({
    "Job Title": PropTypes.string.isRequired,
    Company: PropTypes.string.isRequired,
    Location: PropTypes.string.isRequired,
    "Job Type": PropTypes.string.isRequired,
    Workplace: PropTypes.string.isRequired,
    Experience: PropTypes.string,
    "Job Link": PropTypes.string.isRequired,
  }).isRequired,
};

export default function Writing() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/writing.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load job data");
        return response.json();
      })
      .then((data) => {
        console.log("Fetched jobs:", data); // Debugging: Log fetched data
        setJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err); // Debugging: Log errors
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const jobTitle = job["Job Title"]?.toLowerCase() ?? "";
    const company = job["Company"]?.toLowerCase() ?? "";
    const location = job["Location"]?.toLowerCase() ?? "";

    return (
      jobTitle.includes(searchTerm.toLowerCase()) ||
      company.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase())
    );
  });

  console.log("Filtered jobs:", filteredJobs); // Debugging: Log filtered jobs

  return (
    <div className="container mx-auto p-5">
      <Upperbar />
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-5">
        Writing Jobs
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for jobs..."
        className="w-full p-2 border border-blue-300 rounded-lg mb-5"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p className="text-center text-gray-600">Loading jobs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => <JobCard key={index} job={job} />)
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            {searchTerm ? "No jobs found." : "No jobs available."}
          </p>
        )}
      </div>
      <Foooter />
    </div>
  );
}