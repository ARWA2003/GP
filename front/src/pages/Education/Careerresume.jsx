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

const Careerresume = () => {
  const tools = [
    { 
      title: "CV Builder", 
      description: "Free writing template", 
      link: "https://www.canva.com/resumes/templates/" 
    },
    { 
      title: "Resume Guide", 
      description: "Learn how to craft a strong resume", 
      link: "https://www.indeed.com/career-advice/resumes-cover-letters" 
    },
    { 
      title: "Cover Letter Tips", 
      description: "Write a compelling cover letter", 
      link: "https://zety.com/blog/how-to-write-a-cover-letter" 
    }
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white p-6 text-center rounded-lg shadow-md h-64">
                <h2 className="font-bold text-lg">{tool.title}</h2>
                <p className="text-blue-700">{tool.description}</p>
                <a 
                  href={tool.link}  
                  target="_blank"  
                  rel="noopener noreferrer"
                  className="bg-yellow-200 p-2 rounded mt-9 inline-block hover:bg-yellow-300 transition"
                >
                  Visit
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default Careerresume;