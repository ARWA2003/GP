import { Link } from "react-router-dom";
import Upperbar from "../Upperbar";
import Footer from "../footer/footer";

const volunteers = [
  { id: 1, name: "Sarah Johnson", expertise: "Sign Language, Daily Assistance", avatar: "/assets/volunteer1.png" },
  { id: 2, name: "Michael Lee", expertise: "Deaf Communication, Counseling", avatar: "/assets/volunteer2.png" },
  { id: 3, name: "Emma Davis", expertise: "Daily Life Support, Technology", avatar: "/assets/volunteer3.png" },
  // Add more volunteers as needed
];

const VideoCall = () => {
  return (
    <>
      <Upperbar />

      {/* Header Section */}
      <div className="bg-[#F2DF3A] p-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-[#0078AA]">Choose a Volunteer for Video Call</h1>
        <p className="mt-3 text-[#0078AA] font-semibold text-lg">
          Connect with a caring volunteer via video for support
        </p>
      </div>

      {/* Volunteer Cards */}
      <div className="max-w-4xl mx-auto mt-8 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {volunteers.map((volunteer) => (
          <Link
            to={`/video-call-with-volunteer/${volunteer.id}`}
            key={volunteer.id}
            className="p-6 bg-blue-100 rounded-lg shadow-md text-center hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img
              src={volunteer.avatar} // Replace with actual avatar image paths
              alt={`${volunteer.name}'s avatar`}
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-4">{volunteer.name}</h3>
            <p className="text-gray-600 mt-2">{volunteer.expertise}</p>
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default VideoCall;