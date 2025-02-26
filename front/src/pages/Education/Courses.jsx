import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState } from "react";
import { motion } from "framer-motion";

const circleAnimation = {
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
  const courses = [
    { title: "BI Course", description: "Course for BI topic, with subtitles and sign language", link: "https://example.com/bi-course" },
    { title: "Data Science Course", description: "Course for Data Science, with subtitles and sign language", link: "https://example.com/data-science-course" },
    { title: "Machine Learning Course", description: "Course for Machine Learning, with subtitles and sign language", link: "https://example.com/machine-learning-course" },
    { title: "Deep Learning Course", description: "Course for Deep Learning, with subtitles and sign language", link: "https://example.com/deep-learning-course" },
    { title: "Natural Language Processing Course", description: "Course for NLP, with subtitles and sign language", link: "https://example.com/natural-language-processing-course" },
  ];

  const filteredCourses = courses.filter((course) => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
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

        {/* Search Input */}
      
        
        <input 
          type="text"
          placeholder="Search for a course"
          className="w-1/2 p-2 border rounded mb-4 z-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Course Cards */}
        {filteredCourses.map((course, index) => (
          <div key={index} className="bg-gray-300 p-4 rounded-lg shadow-md w-1/2 mb-4 z-10">
            <h2 className="font-bold">{course.title}</h2>
            <p>{course.description}</p>
            <a 
              href={course.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-yellow-100 p-2 rounded mt-2 block text-center hover:bg-yellow-200 transition"
            >
              Visit
            </a>
          </div>
        ))}
      </div>
      <Foooter />
    </>
  );
};

export default Courses;
