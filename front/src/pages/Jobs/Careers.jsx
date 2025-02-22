import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaClock,  FaChevronRight, FaChevronLeft,FaDollarSign } from "react-icons/fa";
import Foooter from "../footer/footer"; 
import Upperbar from "../Upperbar"
const jobListings = [
  { id: 1, title: "Front-end Developer", type: "Full-Time", location: "USA", remote: "Remote", salary: "$4K/month", posted: "3h ago" },
  { id: 2, title: "Back-end Developer", type: "Part-Time", location: "Germany", remote: "On-Site", salary: "$6K/month", posted: "1 day ago" },
  { id: 3, title: "Writer", type: "Full-Time", location: "UK", remote: "Remote", salary: "$3K/month", posted: "5h ago" },
  { id: 4, title: "Graphic Designer", type: "Internship", location: "France", remote: "Hybrid", salary: "$2K/month", posted: "2 days ago" },
  { id: 5, title: "UI Designer", type: "Full-Time", location: "Japan", remote: "Remote", salary: "$7K/month", posted: "10h ago" },
  { id: 6, title: "Data Entry", type: "Part-Time", location: "India", remote: "On-Site", salary: "$3K/month", posted: "7h ago" },
  { id: 7, title: "Data Analyst", type: "Full-Time", location: "Canada", remote: "Remote", salary: "$5K/month", posted: "4h ago" },
  { id: 8, title: "Full-Stack Developer", type: "Full-Time", location: "Brazil", remote: "Hybrid", salary: "$9K/month", posted: "1 day ago" }
];

const salaryRanges = ["2-5K", "5-7K", "7K+"];
const countries = ["USA", "Germany", "UK", "France", "Japan", "India", "Canada", "Brazil"];
const jobTypes = ["Full-Time", "Part-Time", "Internship"];
const jobNature = ["Remote", "On-Site", "Hybrid"];

export default function JobListings() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedJobType, setSelectedJobType] = useState("");
  const [selectedJobNature, setSelectedJobNature] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const filteredJobs = jobListings.filter((job) => {
    // Extract numerical value from salary string
    const jobSalary = parseInt(job.salary.replace('$', '').replace('K/month', ''));
  
    // Determine the selected salary range limits
    let salaryRangeMin, salaryRangeMax;
    if (selectedSalary) {
      [salaryRangeMin, salaryRangeMax] = selectedSalary
        .replace('K+', '')
        .split('-')
        .map((num) => parseInt(num));
      if (!salaryRangeMax) salaryRangeMax = Infinity; // For ranges like "7K+"
    }
  
    return (
      (selectedLocation === "" || job.location === selectedLocation) &&
      (selectedJobType === "" || job.type === selectedJobType) &&
      (selectedJobNature === "" || job.remote === selectedJobNature) &&
      (selectedSalary === "" || (
        jobSalary >= salaryRangeMin &&
        jobSalary <= salaryRangeMax
      )) &&
      (searchQuery === "" || job.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  return (
    <>
     <div className="bg-gray-100 min-h-screen">
      <Upperbar/>
      {/* <header className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <img src="/assets/logo123.png" alt="Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold">Careers</h1>
        </div>
          <div className="flex items-center bg-yellow-400 px-4 py-2 rounded-full text-black font-semibold shadow-md">
            <img src="/assets/Ellipse.png" alt="User Profile" className="h-8 w-8 rounded-full mr-2" />
            Bob
          </div>
      </header> */}

      <div className="p-4 flex gap-2 flex-wrap">
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <FaSearch />
          <input
            type="text"
            placeholder="Search Jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none w-32"
          />
        </div>
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <FaClock />
          <select value={selectedJobType} onChange={(e) => setSelectedJobType(e.target.value)} className="outline-none">
            <option value="">Job Type</option>
            {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <FaMapMarkerAlt />
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="outline-none">
            <option value="">Location</option>
            {countries.map(country => <option key={country} value={country}>{country}</option>)}
          </select>
        </div>
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <select value={selectedJobNature} onChange={(e) => setSelectedJobNature(e.target.value)} className="outline-none">
            <option value="">Job Nature</option>
            {jobNature.map(nature => <option key={nature} value={nature}>{nature}</option>)}
          </select>
        </div>
        <div className="bg-white flex items-center px-3 py-1 rounded-lg shadow-md gap-2 text-sm">
          <FaDollarSign />
          <select value={selectedSalary} onChange={(e) => setSelectedSalary(e.target.value)} className="outline-none">
            <option value="">Salary Range</option>
            {salaryRanges.map(range => <option key={range} value={range}>{range}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 p-4">
        {currentJobs.map((job) => (
          <div key={job.id} className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="font-semibold text-lg">{job.title}</h2>
            <p className="text-gray-600">{job.type} • {job.location} • {job.remote}</p>
            <p className="font-semibold mt-2">{job.salary}</p>
            <p className="text-gray-400 text-sm">{job.posted}</p>
          </div>
        ))}
      </div>

      {filteredJobs.length > 0 && (
        <div className="flex justify-center gap-4 py-4">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="bg-gray-300 p-2 rounded-full"><FaChevronLeft /></button>
          {[...Array(totalPages)].map((_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? "bg-blue-500 text-white px-4 py-2 rounded-full" : "bg-gray-300 px-4 py-2 rounded-full"}>{index + 1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="bg-gray-300 p-2 rounded-full"><FaChevronRight /></button>
        </div>
      )}

    </div>
    
<Foooter />
    </>
   
  );
}
