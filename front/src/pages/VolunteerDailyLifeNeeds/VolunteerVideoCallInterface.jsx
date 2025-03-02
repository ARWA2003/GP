import { useParams } from "react-router-dom";
import Upperbar from "../Upperbar";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";

const VolunteerVideoCallInterface = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [userName, setUserName] = useState("");
  const [isCalling, setIsCalling] = useState(false);

  // Mock user data (replace with API call in a real app)
  const users = [
    { id: 1, name: "Emma Wilson" },
    { id: 2, name: "Maria Garcia" },
    // Add more users as needed
  ];

  // Simulate finding the user by ID
  useEffect(() => {
    const user = users.find((u) => u.id === parseInt(id));
    if (user) {
      setUserName(user.name);
    }
  }, [id]);

  // Handle starting/ending the call (mock functionality)
  const handleStartCall = () => {
    setIsCalling(true);
    alert(`Starting video call with ${userName}. This is a mock interface—integrate WebRTC or a video service for real functionality.`);
  };

  const handleEndCall = () => {
    setIsCalling(false);
    alert(`Ending video call with ${userName}.`);
  };

  return (
    <>
      <Upperbar />

      {/* Header Section */}
      <div className="bg-[#F2DF3A] p-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-[#0078AA]">Video Call with {userName}</h1>
        <p className="mt-3 text-[#0078AA] font-semibold text-lg">
          Provide support to this deaf user via video (sign language available)
        </p>
      </div>

      {/* Video Call Area (Mock) */}
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
        <div className="h-96 bg-gray-300 flex items-center justify-center rounded-lg">
          <p className="text-gray-600">
            {isCalling
              ? "Simulated video call in progress with user..."
              : "Click 'Start Call' to begin the video call (mock interface)"}
          </p>
        </div>

        {/* Call Controls */}
        <div className="mt-6 flex justify-center gap-4">
          {!isCalling ? (
            <button
              onClick={handleStartCall}
              className="bg-[#0078AA] text-white p-3 rounded-lg hover:bg-[#005d87] transition-colors"
              aria-label="Start video call"
            >
              Start Call
            </button>
          ) : (
            <button
              onClick={handleEndCall}
              className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
              aria-label="End video call"
            >
              End Call
            </button>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default VolunteerVideoCallInterface;