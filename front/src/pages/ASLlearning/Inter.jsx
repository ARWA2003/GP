import Foooter from "../footer/footer";
import UpperbarV from "../UpperbarV";
import { useState } from "react";
import { motion } from "framer-motion";

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
const ASL11 = [
    {
      title: "Hello",
      videoUrl: "https://www.youtube.com/embed/MbggypBmHGw", 
    },
    {
        title: "How are you",
        videoUrl: "https://www.youtube.com/embed/uKtIdUxUqcA", 
      },
      {
        title: "What is your name",
        videoUrl: "https://www.youtube.com/embed/tzgphhetvqM", 
      },
      {
        title: "How old are you",
        videoUrl: "https://www.youtube.com/embed/yQD5HyEyWkI", 
      },
      
      {
        title: "Alphabet",
        videoUrl: "https://www.youtube.com/embed/6_gXiBe9y9A", 
      },
  ];

export default function Inter() {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <>  
        <UpperbarV/>
        <motion.div variants={circleAnimation} animate="animate" className="absolute w-[400px] h-[400px] bg-yellow-200 rounded-full top-[-10px] left-[-150px] shadow-lg flex items-center justify-center z-[-1]"></motion.div>
        <motion.div variants={circleAnimation} animate="animate"className="absolute w-[200px] h-[200px] bg-yellow-200 rounded-full top-[500px] right-[-10px] shadow-lg flex items-center justify-center z-[-1]"></motion.div>
        <motion.div variants={circleAnimation} animate="animate"className="absolute w-[300px] h-[300px] bg-[#0078AA] rounded-full top-[700px] left-[-20px] shadow-lg flex items-center justify-center z-[-1]"></motion.div>
        <motion.div variants={circleAnimation} animate="animate"className="absolute w-[400px] h-[400px] bg-[#0078AA] rounded-full top-[1000px] right-[-10px] shadow-lg flex items-center justify-center z-[-1]"></motion.div>
        <div className="max-w-4xl mx-auto p-6  ">
        <h1 className="text-xl font-bold text-center mb-6 text-[#0078AA] z-[1]">Ready to take your ASL skills further? 🚀 In this level, you will build on your foundation by learning more complex sentences, expressions, and conversational skills through engaging videos. Keep growing and communicating with confidence!</h1>


      {ASL11.map((begi, index) => (
        <div
          key={index}
          className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 text-center z-[1]"
        >
          <h2 className="text-xl font-semibold z-[1]">{begi.title}</h2>
          <button
            className="mt-4 bg-[#FFC107] text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
            onClick={() => setSelectedVideo(begi.videoUrl)}
          >
            WATCH IT
          </button>
          
        </div>
      ))}


      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 ">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedVideo(null)}
            >
              ✖
            </button>
            <iframe
              width="560"
              height="315"
              src={selectedVideo}
              title="YouTube video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      
    </div>


        <Foooter/>



</>
    );
  }
  