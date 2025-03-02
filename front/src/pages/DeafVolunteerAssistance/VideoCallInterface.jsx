import { useParams } from "react-router-dom";
import Upperbar from "../Upperbar";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";

const VideoCallInterface = () => {
  const { id } = useParams(); // Get the volunteer ID from the URL
  const [volunteerName, setVolunteerName] = useState("");
  const [isCalling, setIsCalling] = useState(false);

  // Mock volunteer data (replace with API call in a real app)
  const volunteers = [
    { id: 1, name: "Sarah Johnson", expertise: "Sign Language, Daily Assistance" },
    { id: 2, name: "Michael Lee", expertise: "Deaf Communication, Counseling" },
    { id: 3, name: "Emma Davis", expertise: "Daily Life Support, Technology" },
  ];

  // Simulate finding the volunteer by ID
  useEffect(() => {
    const volunteer = volunteers.find((v) => v.id === parseInt(id));
    if (volunteer) {
      setVolunteerName(volunteer.name);
    }
  }, [id]);

  // Handle starting/ending the call (mock functionality)
  const handleStartCall = () => {
    setIsCalling(true);
    alert(`Starting video call with ${volunteerName}. This is a mock interface—integrate WebRTC or a video service for real functionality.`);
  };

  const handleEndCall = () => {
    setIsCalling(false);
    alert(`Ending video call with ${volunteerName}.`);
  };

  return (
    <>
      <Upperbar />

      {/* Header Section */}
      <div className="bg-[#F2DF3A] p-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-[#0078AA]">Video Call with {volunteerName}</h1>
        <p className="mt-3 text-[#0078AA] font-semibold text-lg">
          Connect with your volunteer via video for support (sign language available)
        </p>
      </div>

      {/* Video Call Area (Mock) */}
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center">
        <div className="h-96 bg-gray-300 flex items-center justify-center rounded-lg">
          <p className="text-gray-600">
            {isCalling
              ? "Simulated video call in progress with volunteer..."
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

export default VideoCallInterface;