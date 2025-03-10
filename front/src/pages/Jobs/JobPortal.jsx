import { useState, useEffect } from "react";
import { Search, MapPin, Briefcase, ArrowRight } from "lucide-react";
import Foooter from "../footer/footer";
import { Link } from "react-router-dom";
import Upperbar from "../Upperbar";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../../api";

const JobPortal = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        console.log("Fetched jobs data:", data);
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to fetch jobs. Please try again later.");
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Log jobs state whenever it updates
  useEffect(() => {
    console.log("Jobs state updated:", jobs);
  }, [jobs]);

  const filteredJobs = jobs.filter((job) => {
    const title = job.job_title || "";
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Log filtered jobs
  console.log("Filtered jobs:", filteredJobs);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 flex justify-center items-center text-white">
        {error}
      </div>
    );
  }

  return (
    <>
      <Upperbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-500 text-white relative">
        <div className="text-center px-5 flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold">Explore Open Career Opportunities</h1>
          <p className="mt-2 text-lg">We commit to exceptional company culture and outstanding benefits.</p>
          <div className="mt-4 flex justify-center w-full max-w-xl mx-auto">
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

        <div className="max-w-6xl mx-auto py-10 px-5">
          <h2 className="text-2xl font-bold mb-5 text-white">Most Featured Jobs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div key={index} className="bg-white p-5 shadow-lg rounded-lg relative text-gray-900">
                  <h3 className="text-lg font-bold mt-3">{job.job_title}</h3>
                  <div className="mt-2 flex items-center text-gray-600">
                    <Briefcase size={16} className="mr-2" />
                    <span>{job.job_type || "N/A"}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin size={16} className="mr-2" />
                    <span>{job.location || "N/A"}</span>
                  </div>
                  <button
                    onClick={() => navigate("/job-details", { state: { job } })}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Apply Now
                  </button>
                </div>
              ))
            ) : (
              <p className="text-white">No jobs found.</p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-5 mb-5">
          <Link
            to="/careers"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition duration-300 shadow-md"
          >
            View More Jobs <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      <Foooter />
    </>
  );
};

export default JobPortal;