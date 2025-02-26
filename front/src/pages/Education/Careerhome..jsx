import { motion } from "framer-motion";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useNavigate } from "react-router-dom";

// Define the circle animation
const circleAnimation = {
  animate: {
    y: [0, -20, 0], // Moves up and down
    scale: [1, 1.1, 1], // Subtle scaling
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

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
      <div className="relative min-h-screen bg-gray-100 p-6 flex flex-col items-center overflow-hidden">
        {/* Animated Circles */}
        <motion.div
          variants={circleAnimation}
          animate="animate"
          className="absolute w-[400px] h-[400px] bg-yellow-200 rounded-full top-[-150px] left-[-150px] shadow-lg"
        ></motion.div>

        <motion.div
          variants={circleAnimation}
          animate="animate"
          className="absolute w-[350px] h-[350px] bg-blue-500 rounded-full bottom-[-100px] right-[-100px]"
        ></motion.div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-5xl">
          <div className="grid grid-cols-3 gap-8 mt-40">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => navigate(category.path)}
                className="bg-yellow-200 p-16 text-center rounded-xl shadow-lg cursor-pointer text-2xl font-bold transition duration-300 hover:bg-yellow-300 hover:scale-110"
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default Careerhome;