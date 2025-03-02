import { useParams } from "react-router-dom";
import Upperbar from "../Upperbar";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";

const ChatInterface = () => {
  const { id } = useParams(); // Get the volunteer ID from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [volunteerName, setVolunteerName] = useState("");

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

    // Mock initial messages (replace with real data or API call)
    setMessages([
      { id: 1, sender: "volunteer", text: "Hello! How can I assist you today? (I’m fluent in sign language and text.)" },
      { id: 2, sender: "user", text: "Hi, I need help with daily tasks and communication tips." },
    ]);
  }, [id]);

  // Handle sending a message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "user", text: newMessage },
      ]);
      setNewMessage(""); // Clear the input
      // Simulate a delay for the volunteer's response (e.g., sign language translation or text reply)
      setTimeout(() => {
        setMessages([
          ...messages,
          { id: messages.length + 2, sender: "volunteer", text: "Got it! I can provide tips and support in sign language or text. What specific task do you need help with?" },
        ]);
      }, 1500); // Longer delay to simulate processing or sign language response
    }
  };

  return (
    <>
      <Upperbar />

      {/* Header Section */}
      <div className="bg-[#F2DF3A] p-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-[#0078AA]">Chat with {volunteerName}</h1>
        <p className="mt-3 text-[#0078AA] font-semibold text-lg">
          Chat with your volunteer for support (text or sign language assistance available)
        </p>
      </div>

      {/* Chat Messages */}
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-3 rounded-lg max-w-xs ${
              message.sender === "user" ? "bg-blue-100 ml-auto" : "bg-gray-200"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="max-w-2xl mx-auto mt-4 p-6 flex items-center gap-4"
      >
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message... (e.g., request sign language help)"
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078AA]"
          aria-label="Chat message input"
        />
        <button
          type="submit"
          className="bg-[#0078AA] text-white p-3 rounded-lg hover:bg-[#005d87] transition-colors"
          aria-label="Send message"
        >
          Send
        </button>
      </form>

      <Footer />
    </>
  );
};

export default ChatInterface;