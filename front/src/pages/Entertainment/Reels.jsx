import { useState, useEffect } from "react";
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";

const videoData = [
  "/videos/reel1.mp4",
  "/videos/vid2.mp4",
  "/videos/video3.mp4",
  "/videos/video4.mp4",
  "/videos/video5.mp4",
  "/videos/video6.mp4",
  "/videos/video7.mp4",
  "/videos/video8.mp4",
];

const Reels = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(videoData[0]);

  useEffect(() => {
    setSelectedVideo(videoData[currentIndex]);
  }, [currentIndex]);

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoData.length);
  };

  const prevVideo = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? videoData.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <Upperbar />

      {/* Page Container */}
      <div className="flex justify-center items-center h-screen bg-gray-200">
        
        {/* Left Arrow */}
        <button
          onClick={prevVideo}
          className="bg-gray-700 text-white p-3 rounded-full text-3xl opacity-70 hover:opacity-100 mr-4"
        >
          ⬅
        </button>

        {/* Video Container */}
        <div className="relative w-[45vw] h-[80vh] bg-gray-300 rounded-xl shadow-lg flex justify-center items-center">
          <video
            src={selectedVideo}
            controls
            autoPlay
            loop
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextVideo}
          className="bg-gray-700 text-white p-3 rounded-full text-3xl opacity-70 hover:opacity-100 ml-4"
        >
          ➡
        </button>

      </div>

      <Foooter />
    </>
  );
};

export default Reels;
