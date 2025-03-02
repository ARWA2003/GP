import { Link } from "react-router-dom";
import Upperbar from "../Upperbar";
import Footer from "../footer/footer";

const videoCallRequests = [
  { id: 1, user: "Emma Wilson", time: "2025-03-02 10:30 AM", avatar: "/assets/user3.png" },
  { id: 2, user: "Maria Garcia", time: "2025-03-02 11:30 AM", avatar: "/assets/user4.png" },
  // Add more video call requests as needed
];

const VolunteerVideoCall = () => {
  return (
    <>
      <Upperbar />

      {/* Header Section */}
      <div className="bg-[#F2DF3A] p-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-[#0078AA]">Video Call Requests</h1>
        <p className="mt-3 text-[#0078AA] font-semibold text-lg">
          Choose a deaf user for a video call
        </p>
      </div>

      {/* Video Call Request Cards */}
      <div className="max-w-4xl mx-auto mt-8 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoCallRequests.map((request) => (
          <Link
            to={`/volunteer-video-call-interface/${request.id}`}
            key={request.id}
            className="p-6 bg-blue-100 rounded-lg shadow-md text-center hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img
              src={request.avatar} // Replace with actual user avatar image paths
              alt={`${request.user}'s avatar`}
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-4">{request.user}</h3>
            <p className="text-gray-600 mt-2">Requested at: {request.time}</p>
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default VolunteerVideoCall;