import { useState, useEffect } from "react";
import { FaSearch, FaMapMarkerAlt, FaClock, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Foooter from "../footer/footer";
import Upperbar from "../Upperbar";
import { useNavigate } from "react-router-dom";

export default function JobListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const jobsPerPage = 6;
  const navigate = useNavigate();

  // Fetch the JSON data from the public folder when the component mounts
  useEffect(() => {
    fetch("/job_listings.json") // Path to the JSON file in the public folder
      .then((response) => response.json())
      .then((data) => {
        setJobListings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job listings:", error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredJobs = jobListings.filter(
    (job) =>
      job["Job Title"].toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedType === "" || job["Job Type"] === selectedType) &&
      (selectedLocation === "" || job["Location"] === selectedLocation)
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));

  if (loading) {
    return <div className="bg-gray-100 min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Upperbar />
      <div className="p-4 flex gap-2 flex-wrap">
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <FaSearch />
          <input
            type="text"
            placeholder="Search Jobs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="outline-none w-32"
          />
        </div>
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <FaClock />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="outline-none"
          >
            <option value="">Job Type</option>
            <option>Full Time</option>
            {/* Add other job types if necessary */}
          </select>
        </div>
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <FaMapMarkerAlt />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="outline-none"
          >
            <option value="">Location</option>
            {Array.from(new Set(jobListings.map((job) => job["Location"]))).map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {currentJobs.map((job, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="font-semibold text-lg text-blue-500">{job["Job Title"]}</h2>
            <p className="flex items-center gap-2 text-gray-600">
              <FaClock /> {job["Job Type"]}
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt /> {job["Location"]}
            </p>
            <button
              onClick={() => navigate("/job-details")}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          <FaArrowLeft />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
        >
          <FaArrowRight />
        </button>
      </div>
      <Foooter />
    </div>
  );
}