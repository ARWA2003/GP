import { useState } from "react";
import { Search, MapPin, Briefcase, ArrowRight } from "lucide-react";
import Foooter from "../footer/footer";
import { Link } from "react-router-dom";
import Upperbar from "../Upperbar"


const jobs = [
  {
    title: "Customer Service",
    category: "Sales, Service, & Support",
    type: "Full-Time",
    location: "USA",
    image: "/assets/Customer Service.jpeg",
  },
  {
    title: "Full-Stack Developer",
    category: "Engineering & Tech",
    type: "Full-Time",
    location: "Australia",
    image: "/assets/Full-Stack.jpeg",
  },
  {
    title: "HR Director",
    category: "People",
    type: "Part-Time",
    location: "Canada",
    image: "/assets/HR Director.jpeg",
  },
  {
    title: "Front-End Developer",
    category: "Engineering & Tech",
    type: "Full-Time",
    location: "Germany",
    image: "/assets/Front-End Developer.jpg",
  },
  {
    title: "Back-End Developer",
    category: "Engineering & Tech",
    type: "Full-Time",
    location: "UK",
    image: "/assets/Back-End Developer.jpg",
  },
  {
    title: "Data Engineer",
    category: "Data Science",
    type: "Full-Time",
    location: "Netherlands",
    image: "/assets/Data Engineer.jpg",
  },
];

const JobPortal = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Upperbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 text-white relative">
        {/* Header Section */}
        {/* <header className="w-full flex justify-between items-center p-6 relative">
          <img src="/assets/logo123.png" alt="Company Logo" className="h-16" />
          <div className="flex items-center bg-yellow-400 px-4 py-2 rounded-full text-black font-semibold shadow-md">
            <img src="/assets/Ellipse.png" alt="User Profile" className="h-8 w-8 rounded-full mr-2" />
            Bob
          </div>
        </header> */}

        {/* Hero Section */}
        <div className="text-center mt-10 px-5">
          <h1 className="text-4xl font-bold">Explore Open Career Opportunities</h1>
          <p className="mt-2 text-lg">We commit to exceptional company culture and outstanding benefits.</p>
          <div className="mt-6 flex justify-center w-full max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Find the job that best suits you."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-4 w-full rounded-l-lg text-gray-700 border border-gray-300"
            />
            <button className="bg-blue-700 text-white px-6 rounded-r-lg flex items-center">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Jobs Section */}
        <div className="max-w-6xl mx-auto py-10 px-5">
          <h2 className="text-2xl font-bold mb-5 text-white">Most Featured Jobs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredJobs.map((job, index) => (
              <div key={index} className="bg-white p-5 shadow-lg rounded-lg relative text-gray-900">
                <img src={job.image} alt={job.title} className="w-full h-40 object-cover rounded-md" />
                <h3 className="text-lg font-bold mt-3">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.category}</p>
                <div className="mt-2 flex items-center text-gray-600">
                  <Briefcase size={16} className="mr-2" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin size={16} className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

      {/* View More Jobs Button */}
        <div className="flex justify-center mt-5 mb-5">
          <Link to="/careers" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition duration-300 shadow-md">
            View More Jobs <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Footer Section */}
      <Foooter />
    </>
  );
};

export default JobPortal;
