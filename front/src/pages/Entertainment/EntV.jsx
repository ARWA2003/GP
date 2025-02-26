import { motion } from "framer-motion";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState } from "react";

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

const categories = [
  { title: "Kids Story", image: "/assets/kidsstory.png", link: "/kids-story" },
  { title: "Daily Vlogs", image: "/assets/vlogsimg.svg", link: "/daily-vlogs" },
  { title: "Short Movies", image: "/assets/shortmovie.png", link: "/short-movies" },
];

const EntV = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="relative z-10 w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Entertainment Videos</h2>

          <input
            type="text"
            placeholder="Search by category"
            className="w-[80%] max-w-md p-2 border border-gray-400 rounded-md text-center mb-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-col gap-6 w-[80%] max-w-lg">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <a
                  key={index}
                  href={category.link}
                  className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center transition-transform hover:scale-105"
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-50 h-50 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </a>
              ))
            ) : (
              <p className="text-gray-600">No matching categories found.</p>
            )}
          </div>
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default EntV;