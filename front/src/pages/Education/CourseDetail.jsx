import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom"; // To get category from URL

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

const CourseDetail = () => {
  const { category } = useParams(); // Extract category from URL (e.g., "data-science")
  const [searchTerm, setSearchTerm] = useState("");

  // Define categories with associated courses
  const categories = [
    {
      title: "Data Science",
      courses: [
        { title: "Computer Science for Python Programming", description: "An introduction to programming using Python, a popular language for general-purpose programming, data science, web programming, and more.", link: "https://www.edx.org/certificates/professional-certificate/harvardx-computer-science-for-python-programming?index=product&queryId=2d0ffc38a60904acea9315c5e77d605c&position=1&correlationId=ad44b181-5872-4b17-9c68-6ba0c9146e0c" },
        { title: "HarvardX: Data Science: Machine Learning", description: "Build a movie recommendation system and learn the science behind one of the most popular and successful data science techniques.", link: "https://www.edx.org/learn/machine-learning/harvard-university-data-science-machine-learning?index=product&queryId=3654780be5adec0ac0fded6e82a00cba&position=2&correlationId=8ef276a0-1279-42a1-8d1e-50812ef6f507" },
        { title: "University of Cape Town: Data Science with Python", description: "Gain meaningful insights from data to inform your decision making.", link: "https://www.edx.org/executive-education/university-of-cape-town-data-science-with-python?index=product&queryId=48e3a94d56d0b3da8581354795d13cf5&position=1&correlationId=ffe48f01-cb96-448e-9b22-1dc081650a5f" },
        { title: "IBM: Python Basics for Data Science", description: "This Python course provides a beginner-friendly introduction to Python for Data Science. Practice through lab exercises, and you'll be ready to create your first Python scripts on your own!", link: "https://www.edx.org/learn/python/ibm-python-basics-for-data-science?index=product&queryId=a347875d935975112c3ee21c229f1e3a&position=10&correlationId=0c1c4619-e284-48aa-996f-b0d9949e333a" },
        { title: "HarvardX: Data Science: Visualization", description: "Learn basic data visualization principles and how to apply them using ggplot2", link: "https://www.edx.org/learn/data-visualization/harvard-university-data-science-visualization?index=product&queryId=2566d6c5eb484552de6eba45eb62f26a&position=15&correlationId=cd5e4589-c724-4330-8fad-f0fec2187927" },

      ],
    },
    {
      title: "Business & Management",
      courses: [
        { title: "Business Management Basics", description: "Fundamentals of Business with subtitles and sign language", link: "https://example.com/business-management-basics" },
        { title: "Leadership Skills", description: "Develop leadership skills for management", link: "https://example.com/leadership-skills" },
      ],
    },
    {
      title: "Computer Science",
      courses: [
        { title: "CS Fundamentals", description: "Introduction to Computer Science with subtitles and sign language", link: "https://example.com/cs-fundamentals" },
        { title: "Algorithms 101", description: "Learn basic algorithms", link: "https://example.com/algorithms-101" },
      ],
    },
    {
      title: "Math",
      courses: [
        { title: "Algebra Basics", description: "Basic Algebra with subtitles and sign language", link: "https://example.com/algebra-basics" },
        { title: "Calculus I", description: "Introduction to Calculus", link: "https://example.com/calculus-i" },
      ],
    },
    {
      title: "Engineering",
      courses: [
        { title: "Introduction to Engineering", description: "Engineering basics with subtitles and sign language", link: "https://example.com/engineering-intro" },
        { title: "Mechanical Engineering 101", description: "Fundamentals of Mechanical Engineering", link: "https://example.com/mechanical-engineering-101" },
      ],
    },
    {
      title: "Food & Nutrition",
      courses: [
        { title: "Nutrition 101", description: "Introduction to Nutrition with subtitles and sign language", link: "https://example.com/nutrition-101" },
        { title: "Healthy Eating", description: "Learn about balanced diets", link: "https://example.com/healthy-eating" },
      ],
    },
    {
      title: "Architecture",
      courses: [
        { title: "Architectural Design", description: "Basics of Architecture with subtitles and sign language", link: "https://example.com/architectural-design" },
        { title: "Sustainable Architecture", description: "Learn sustainable design principles", link: "https://example.com/sustainable-architecture" },
      ],
    },
    {
      title: "Law",
      courses: [
        { title: "Legal Foundations", description: "Introduction to Law with subtitles and sign language", link: "https://example.com/legal-foundations" },
        { title: "Criminal Law Basics", description: "Basics of Criminal Law", link: "https://example.com/criminal-law-basics" },
      ],
    },
    {
      title: "Education & Teacher Training",
      courses: [
        { title: "Teacher Training 101", description: "Basics of Teaching with subtitles and sign language", link: "https://example.com/teacher-training-101" },
        { title: "Classroom Management", description: "Effective classroom strategies", link: "https://example.com/classroom-management" },
      ],
    },
    {
      title: "Medicine",
      courses: [
        { title: "Medical Basics", description: "Introduction to Medicine with subtitles and sign language", link: "https://example.com/medical-basics" },
        { title: "Anatomy 101", description: "Learn human anatomy", link: "https://example.com/anatomy-101" },
      ],
    },
  ];

  // Convert URL category back to title (e.g., "data-science" to "Data Science")
  const categoryTitle = category
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Find the selected category and its courses
  const selectedCategory = categories.find((cat) => cat.title === categoryTitle);
  const courses = selectedCategory ? selectedCategory.courses : [];

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Selected Category:", selectedCategory); // Debug log
  console.log("Filtered Courses:", filteredCourses); // Debug log

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
          {/* 🔹 Header with Back Link */}
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">{categoryTitle} Courses</h1>
            <Link
              to="/courses"
              className="text-blue-500 hover:underline"
            >
              Back to Categories
            </Link>
          </div>

          {/* 🔹 Search Input */}
          <input
            type="text"
            placeholder="Search for a course"
            className="w-full p-2 border border-gray-300 rounded mb-8 text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* 🔹 Courses List */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 transition"
                >
                  <h2 className="font-semibold text-gray-800">{course.title}</h2>
                  <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                  <a
                    href={course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-center bg-yellow-100 p-2 rounded hover:bg-yellow-200 transition"
                  >
                    Visit Course
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No courses found for this category.</p>
          )}
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default CourseDetail;