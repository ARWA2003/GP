
import Upperbar from "../Upperbar";
import Foooter from "../footer/footer";
import { useState } from "react";
const videoData = [
    "/videos/reel1.mp4",
    "/videos/video2.mp4",
    "/videos/video3.mp4",
    "/videos/video4.mp4",
    "/videos/video5.mp4",
    "/videos/video6.mp4",
    "/videos/video7.mp4",
    "/videos/video8.mp4",
  ];
  

const Reels = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const openVideo = (index) => {
      setSelectedVideo(videoData[index]);
      setCurrentIndex(index);
    };
  
    const closeVideo = () => {
      setSelectedVideo(null);
    };
  
    const nextVideo = () => {
      const newIndex = (currentIndex + 1) % videoData.length;
      setSelectedVideo(videoData[newIndex]);
      setCurrentIndex(newIndex);
    };
  
    const prevVideo = () => {
      const newIndex = (currentIndex - 1 + videoData.length) % videoData.length;
      setSelectedVideo(videoData[newIndex]);
      setCurrentIndex(newIndex);
    };

    return (
      <>
      <Upperbar/>

      <div className="p-6 bg-gray-00">
      <h2 className="text-3xl font-bold text-center text-[#FFC107]">Reels</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {videoData.map((video, index) => (
          <div
            key={index}
            className="bg-[#0078AA] h-40 flex justify-center items-center cursor-pointer hover:scale-105 transition"
            onClick={() => openVideo(index)}
          >
            <span className="text-white font-bold text-xl">Video {index + 1}</span>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button onClick={closeVideo} className="absolute top-4 right-4 text-white text-3xl">&times;</button>
          <button onClick={prevVideo} className="absolute left-4 text-white text-2xl">&#10094;</button>
          <video src={selectedVideo} controls autoPlay loop className="w-3/4 h-auto max-h-[90vh]" />
          <button onClick={nextVideo} className="absolute right-4 text-white text-2xl">&#10095;</button>
        </div>
      )}
    </div>

      <Foooter/>
     </>
       );
};

export default Reels;