import { motion } from "framer-motion";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

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
const Etools = () => {
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
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Tool 1 */}
          <div className="bg-white p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4">
            <img src="/assets/tool1.jpeg" alt="Grammarly Logo" className="w-12 h-12 rounded-md" />
            <div className="flex-1">
              <h2 className="font-bold">Grammarly</h2>
              <p>Helps with grammar, spelling, and clarity.</p>
            </div>
            <a
              href="https://www.grammarly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-200 p-2 rounded hover:bg-yellow-400 transition"
            >
              Visit
            </a>
          </div>

          {/* Tool 2 */}
          <div className="bg-white p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4">
            <img src="" alt="Logo" className="w-12 h-12 rounded-md" />
            <div className="flex-1">
              <h2 className="font-bold">Tool 2</h2>
              <p></p>
            </div>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-200 p-2 rounded hover:bg-yellow-400 transition"
            >
              Visit
            </a>
          </div>

          {/* Tool 3 */}
          <div className="bg-white p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4">
            <img src="" alt="Logo" className="w-12 h-12 rounded-md" />
            <div className="flex-1">
              <h2 className="font-bold">Tool 3</h2>
              <p></p>
            </div>
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-200 p-2 rounded hover:bg-yellow-400 transition"
            >
              Visit
            </a>
          </div>

          {/* Placeholder Tools */}
          <div className="bg-white p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4"></div>
          <div className="bg-white p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4"></div>
          <div className="bg-white p-4 rounded-lg shadow-md w-3/5 mb-4 flex items-center space-x-4"></div>
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default Etools;