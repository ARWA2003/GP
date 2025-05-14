import { useNavigate } from "react-router-dom";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

const jobCategories = [
  { name: "Banking", image: "/assets/banking.jpg", path: "/banking" },
  { name: "Accounting/Finance", image: "/assets/finance.jpg", path: "/finance" },
  { name: "Business Development", image: "/assets/business.jpg", path: "/business" },
  { name: "Creative/Design/Art", image: "/assets/design.jpg", path: "/design" },
  { name: "Writing/Editorial", image: "/assets/writing.jpg", path: "/writing" },
  { name: "IT/Software Development", image: "/assets/IT.jpg", path: "/it" },
];

const JobCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-blue-400 flex flex-col">
      <Upperbar />
      <div className="flex-1 p-6 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-600 mb-8">
          Jobs by Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {jobCategories.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-transparent hover:border-yellow-400"
              onClick={() => handleCategoryClick(job.path)}
            >
              <img
                src={job.image}
                alt={job.name}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <p className="text-lg font-semibold text-gray-800">{job.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Foooter />
    </div>
  );
};

export default JobCategories;