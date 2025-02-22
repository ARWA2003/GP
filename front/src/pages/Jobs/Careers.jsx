import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaClock, FaDollarSign, FaBriefcase, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Foooter from "../footer/footer";
import Upperbar from "../Upperbar";
import { useNavigate } from "react-router-dom";

const jobListings = [
  { id: 1, title: "Front-end Developer", type: "Full-Time", location: "USA", remote: "Remote", salary: "$4K", posted: "3h ago" },
  { id: 2, title: "Back-end Developer", type: "Part-Time", location: "Germany", remote: "On-Site", salary: "$6K", posted: "1 day ago" },
  { id: 3, title: "Writer", type: "Full-Time", location: "UK", remote: "Remote", salary: "$3K", posted: "5h ago" },
  { id: 4, title: "Graphic Designer", type: "Internship", location: "France", remote: "Hybrid", salary: "$2K", posted: "2 days ago" },
  { id: 5, title: "UI Designer", type: "Full-Time", location: "Japan", remote: "Remote", salary: "$7K", posted: "10h ago" },
  { id: 6, title: "Data Entry", type: "Part-Time", location: "India", remote: "On-Site", salary: "$3K", posted: "7h ago" },
  { id: 7, title: "Data Analyst", type: "Full-Time", location: "Canada", remote: "Remote", salary: "$5K", posted: "4h ago" },
  { id: 8, title: "Full-Stack Developer", type: "Full-Time", location: "Brazil", remote: "Hybrid", salary: "$9K", posted: "1 day ago" }
];

export default function JobListings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRemote, setSelectedRemote] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredJobs = jobListings.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedType === "" || job.type === selectedType) &&
    (selectedLocation === "" || job.location === selectedLocation) &&
    (selectedRemote === "" || job.remote === selectedRemote) &&
    (selectedSalary === "" || job.salary === selectedSalary)
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));

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
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="outline-none">
            <option value="">Job Type</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
          </select>
        </div>
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <FaMapMarkerAlt />
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="outline-none">
            <option value="">Location</option>
            {Array.from(new Set(jobListings.map(job => job.location))).map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <select value={selectedRemote} onChange={(e) => setSelectedRemote(e.target.value)} className="outline-none">
            <option value="">Job Nature</option>
            <option>Remote</option>
            <option>On-Site</option>
            <option>Hybrid</option>
          </select>
        </div>
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <FaDollarSign />
          <select value={selectedSalary} onChange={(e) => setSelectedSalary(e.target.value)} className="outline-none">
            <option value="">Salary Range</option>
            <option>$2K</option>
            <option>$3K</option>
            <option>$4K</option>
            <option>$5K</option>
            <option>$6K</option>
            <option>$7K</option>
            <option>$8K+</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {currentJobs.map((job) => (
          <div key={job.id} className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="font-semibold text-lg text-blue-500">{job.title}</h2>
            <p className="flex items-center gap-2 text-gray-600"><FaClock /> {job.type}</p>
            <p className="flex items-center gap-2 text-gray-600"><FaMapMarkerAlt /> {job.location}</p>
            <p className="flex items-center gap-2 text-gray-600"><FaBriefcase /> {job.remote}</p>
            <p className="flex items-center gap-2 font-semibold mt-2"><FaDollarSign /> {job.salary}</p>
            <p className="text-gray-400 text-sm">{job.posted}</p>
            <button onClick={() => navigate("/job-details")} className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Apply Now</button>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-4">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50">
          <FaArrowLeft />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50">
          <FaArrowRight />
        </button>
      </div>
      <Foooter />
    </div>
  );
}