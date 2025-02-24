import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useNavigate } from "react-router-dom";

const Careerhome = () => {
  const navigate = useNavigate(); 

  const categories = [
    { name: "Resume", path: "/Careercv" },
    { name: "Interview", path: "/interview" },
    { name: "Soft Skills Tips", path: "/soft-skills" },
  ];

  return (
    <>
      <Upperbar />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <div className="grid grid-cols-3 gap-8 mt-40">
          {categories.map((category, index) => (
            <div 
              key={index} 
              onClick={() => navigate(category.path)}
              className="bg-yellow-200 p-16 text-center rounded-xl shadow-lg cursor-pointer text-2xl font-bold transition duration-300 hover:bg-yellow-250 hover:scale-110"
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
      <Foooter />
    </>
  );
}

export default Careerhome;
