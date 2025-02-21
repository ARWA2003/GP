import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
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


const shortMovies = [
    {
      title: "the End",
      description:
        "This movie is an inspiring journey of adventure and discovery.",
      videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID", 
    },
    {
        title: "the End",
        description:
          "This movie is an inspiring journey of adventure and discovery.",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID", 
      },
      {
        title: "the End",
        description:
          "This movie is an inspiring journey of adventure and discovery.",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID", 
      },
      {
        title: "the End",
        description:
          "This movie is an inspiring journey of adventure and discovery.",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID", 
      },
      
      {
        title: "the End",
        description:
          "This movie is an inspiring journey of adventure and discovery.",
        videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID", 
      },
      
      

  ];
const ShortM = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    return (
        <>
        <Upperbar/>
              <motion.div variants={circleAnimation} animate="animate" className="absolute w-[400px] h-[400px] bg-yellow-200 rounded-full top-[-10px] left-[-150px] shadow-lg flex items-center justify-center z-[-1]"></motion.div>
              <motion.div variants={circleAnimation} animate="animate"className="absolute w-[200px] h-[200px] bg-yellow-200 rounded-full top-[500px] right-[-10px] shadow-lg flex items-center justify-center z-[-1]"></motion.div>
              <motion.div variants={circleAnimation} animate="animate"className="absolute w-[300px] h-[300px] bg-[#0078AA] rounded-full top-[700px] left-[-20px] shadow-lg flex items-center justify-center z-[-1]"></motion.div>
              <motion.div variants={circleAnimation} animate="animate"className="absolute w-[400px] h-[400px] bg-[#0078AA] rounded-full top-[1000px] right-[-10px] shadow-lg flex items-center justify-center z-[-1]"></motion.div>
        <div className="max-w-4xl mx-auto p-6  ">

      <h1 className="text-3xl font-bold text-center mb-6 text-[#0078AA] z-[1]">Short Movies</h1>


      {shortMovies.map((movie, index) => (
        <div
          key={index}
          className="bg-gray-100 p-6 rounded-lg shadow-md mb-6 text-center z-[1]"
        >
          <h2 className="text-xl font-semibold z-[1]">{movie.title}</h2>
          <p className="text-gray-600 mt-2 z-[1]">{movie.description}</p>


          <button
            className="mt-4 bg-[#FFC107] text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
            onClick={() => setSelectedVideo(movie.videoUrl)}
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
};

export default ShortM;