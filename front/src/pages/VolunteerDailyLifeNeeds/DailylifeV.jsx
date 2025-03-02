import { Link } from "react-router-dom";

import Footer from "../footer/footer";
import UpperbarV from "../UpperbarV";

const supportRequests = [
  { id: 1, user: "Alex Smith", type: "Chat", time: "2025-03-02 10:00 AM", avatar: "/assets/user1.png" },
  { id: 2, user: "Emma Wilson", type: "Video Call", time: "2025-03-02 10:30 AM", avatar: "/assets/user2.png" },
  { id: 3, user: "John Doe", type: "Chat", time: "2025-03-02 11:00 AM", avatar: "/assets/user3.png" },
  // Add more requests as needed
];

const DailylifeV = () => {
  return (
    <>
      <UpperbarV />

      {/* Header Section */}
      <div className="bg-[#F2DF3A] p-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-[#0078AA]">Daily Life Support Requests</h1>
        <p className="mt-3 text-[#0078AA] font-semibold text-lg">
          Respond to requests from deaf users for support
        </p>
      </div>

      {/* Request Cards for Chat and Video Call */}
      <div className="max-w-4xl mx-auto mt-8 p-6 flex flex-col md:flex-row items-center justify-center gap-6">
        {supportRequests.map((request) => (
          <Link
            to={
              request.type === "Chat"
                ? `/volunteer-chat-interface/${request.id}`
                : `/volunteer-video-call-interface/${request.id}`
            }
            key={request.id}
            className="w-full md:w-1/2 p-6 bg-blue-100 rounded-lg shadow-md text-center hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img
              src={request.avatar} // Replace with actual user avatar image paths
              alt={`${request.user}'s avatar`}
              className="w-40 h-40 object-cover mx-auto rounded-full"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-4">
              {request.user} - {request.type}
            </h3>
            <p className="text-gray-600 mt-2">Requested at: {request.time}</p>
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default DailylifeV;