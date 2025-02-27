import { motion } from "framer-motion";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useNavigate } from "react-router-dom";

// Define the circle animation
const starAnimation = {
  animate: {
    y: [0, -20, 0], 
    scale: [1, 1.1, 1], 
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
        <motion.img
          src="/assets/puzzle.png" 
          alt="Star"
          variants={starAnimation}
          animate="animate"
          className="absolute w-40 top-[10%] left-[10%] opacity-70"
        />
        <motion.img
          src="/assets/puzzle.png" 
          alt="Star"
          variants={starAnimation}
          animate="animate"
          className="absolute w-40 top-[47%] left-[13%] opacity-70"
        />

        <motion.img
          src="/assets/puzzle.png"
          alt="Star"
          variants={starAnimation}
          animate="animate"
          className="absolute w-40 top-[10%] right-[10%] opacity-70"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Star"
          variants={starAnimation}
          animate="animate"
          className="absolute w-40 top-[47%] right-[13%] opacity-70"
        />

        <motion.img
          src="/assets/puzzle.png"
          alt="Star"
          variants={starAnimation}
          animate="animate"
          className="absolute w-40 bottom-[3%] left-[7%] opacity-70"
        />

        <motion.img
          src="/assets/puzzle.png"
          alt="Star"
          variants={starAnimation}
          animate="animate"
          className="absolute w-40 bottom-[3%] right-[7%] opacity-70"
        />


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