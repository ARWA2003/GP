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
    { title: "Data Science", image: "/assets/courses1.png" },
    { title: "Business & Management", image: "/assets/courses2.png" },
    { title: "Computer Science", image: "/assets/courses3.png" },
    { title: "Math", image: "/assets/courses4.png" },
    { title: "Engineering", image: "/assets/courses5.png" },
    { title: "Food & Nutrition", image: "/assets/courses6.png" },
    { title: "Architecture", image: "/assets/courses7.png" },
    { title: "Law", image: "/assets/courses8.png" },
    { title: "Education & Teacher Training", image: "/assets/courses9.png" },
    { title: "Medicine", image: "/assets/courses10.png" },
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
      <div className="relative min-h-screen bg-gradient-to-br from-yellow-300 to-blue-400 p-6 flex flex-col items-center justify-start overflow-hidden">
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
        <div className="w-full max-w-5xl mt-16 md:mt-20 z-10">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-yellow-600 mb-8">
            Explore Courses
          </h1>

          {/* Search Input */}
          <div className="relative max-w-lg mx-auto mb-8">
            <input
              type="text"
              placeholder="Search for a category"
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <Link
                  key={index}
                  to={`/courses/${category.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                  className="bg-white p-4 rounded-lg shadow-lg text-center hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center min-h-[150px] border border-yellow-200 hover:border-yellow-400"
                >
                  <img
                    src={category.image}
                    alt={`${category.title} Icon`}
                    className="w-20 h-20 mb-3 object-cover rounded-full"
                  />
                  <h2 className="font-semibold text-gray-800 text-sm md:text-base">{category.title}</h2>
                </Link>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-700 text-lg">
                No categories found.
              </p>
            )}
          </div>
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default Courses;