import Foooter from "../footer/footer";
import UpperbarV from "../UpperbarV";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function ASLlevels() {
    const levels = [
        { name: "beginner", route: "/beginner", filled: 1 },
        { name: "intermediate", route: "/intermediate", filled: 2 },
        { name: "advanced", route: "/advanced", filled: 3 }
    ];
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
    return (
<>  
<UpperbarV/>
<div className="flex flex-col items-center space-y-6 mt-10">
            <motion.img
              src="/assets/ASL/ASL1.png" 
              alt="Star"
              variants={starAnimation}
              animate="animate"
              className="absolute w-48 top-[22%] left-[10%] opacity-70"
            />
            <motion.img
            src="/assets/ASL/ASL2.png" 
              alt="Star"
              variants={starAnimation}
              animate="animate"
              className="absolute w-48 top-[55%] left-[13%] opacity-70"
            />
    
            <motion.img
              src="/assets/ASL/ASL4.png" 
              alt="Star"
              variants={starAnimation}
              animate="animate"
              className="absolute w-44 top-[22%] right-[10%] opacity-70"
            />
            <motion.img
              src="/assets/ASL/ASL3.png" 
              alt="Star"
              variants={starAnimation}
              animate="animate"
              className="absolute w-48 top-[56%] right-[13%] opacity-70"
            />
    
            <motion.img
              src="/assets/ASL/ASL4.png" 
              alt="Star"
              variants={starAnimation}
              animate="animate"
              className="absolute w-44 top-[97%] left-[7%] opacity-70"
            />
    
            <motion.img
              src="/assets/ASL/ASL2.png" 
              alt="Star"
              variants={starAnimation}
              animate="animate"
              className="absolute w-48 top-[97%] right-[7%] opacity-70"
            />
            
            <h2 className="text-5xl font-bold text-blue-900">ASL Levels</h2>
            {levels.map((level, index) => (
                <Link to={level.route} key={index} className=" h-64 w-64">
                    <div className="bg-gray-200 p-6 text-center rounded-lg cursor-pointer hover:bg-gray-300 h-64 w-64">
                        <div className="flex justify-center space-x-2 mb-2">
                            {Array(3).fill(0).map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`w-14 h-14 mt-16 border-2 rounded ${
                                        i < level.filled ? "bg-yellow-400 border-yellow-400" : "border-blue-900"
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="font-semibold text-2xl mt-5 ">{level.name}</p>
                    </div>
                </Link>
            ))}
        </div>
        <div className="mt-5">
        <Foooter/>
        </div>


</>
    );
  }
  