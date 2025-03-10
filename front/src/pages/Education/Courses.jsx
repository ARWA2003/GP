import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Define categories with associated images
  const categories = [
    { title: "Data Science", image: "../../../public/assets/courses1.png" },
    { title: "Business & Management", image: "../../../public/assets/courses2.png" },
    { title: "Computer Science", image: "../../../public/assets/courses3.png" },
    { title: "Math", image: "../../../public/assets/courses4.png" },
    { title: "Engineering", image: "../../../public/assets/courses5.png" },
    { title: "Food & Nutrition", image: "../../../public/assets/courses6.png" },
    { title: "Architecture", image: "../../../public/assets/courses7.png" },
    { title: "Law", image: "../../../public/assets/courses8.png" },
    { title: "Education & Teacher Training", image: "../../../public/assets/courses9.png" },
    { title: "Medicine", image: "../../../public/assets/courses10.png" },
  ];

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Categories:", categories);
  console.log("Filtered Categories:", filteredCategories);

  return (
    <>
      <Upperbar />
      <div className="relative min-h-screen bg-gray-100 p-6 flex flex-col items-center justify-start overflow-hidden">
        {/* Decorative Elements */}
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 top-[10%] left-[10%] opacity-50"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 top-[40%] left-[5%] opacity-50"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 top-[10%] right-[10%] opacity-50"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 top-[40%] right-[5%] opacity-50"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 bottom-[10%] left-[10%] opacity-50"
        />
        <motion.img
          src="/assets/puzzle.png"
          alt="Decorative Puzzle"
          variants={starAnimation}
          animate="animate"
          className="absolute w-24 bottom-[10%] right-[10%] opacity-50"
        />

        {/* Main Content */}
        <div className="w-full max-w-4xl mt-20 z-10">
          {/* 🔹 Search Input */}
          <input
            type="text"
            placeholder="Search for a category"
            className="w-full p-2 border border-gray-300 rounded mb-8 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* 🔹 Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredCategories.map((category, index) => (
              <Link
                key={index}
                to={`/courses/${category.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className="bg-white p-4 rounded-lg shadow-md text-center hover:bg-gray-100 transition transform hover:scale-105 flex flex-col items-center justify-center min-h-[150px] border border-gray-200"
              >
                <img
                  src={category.image}
                  alt={`${category.title} Icon`}
                  className="w-20 h-20 mb-2 object-cover rounded"
                />
                <h2 className="font-semibold text-gray-800 text-sm">{category.title}</h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default Courses;