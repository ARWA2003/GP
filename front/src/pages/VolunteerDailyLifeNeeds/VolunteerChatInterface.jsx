import { useParams } from "react-router-dom";

import Footer from "../footer/footer";
import { useState, useEffect } from "react";
import UpperbarV from "../UpperbarV";

const VolunteerChatInterface = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");

  // Mock user data (replace with API call in a real app)
  const users = [
    { id: 1, name: "Alex Smith" },
    { id: 2, name: "John Doe" },
    // Add more users as needed
  ];

  // Simulate finding the user by ID
  useEffect(() => {
    const user = users.find((u) => u.id === parseInt(id));
    if (user) {
      setUserName(user.name);
    }

    // Corrected initial messages: Deaf user asks for help, volunteer responds
    setMessages([
      { id: 1, sender: "user", text: "Hello! I need help with daily tasks. Can you assist me in sign language or text?" },
      { id: 2, sender: "volunteer", text: "Hi Alex, I’d be happy to help! I’m fluent in sign language and text. What specific task do you need assistance with?" },
    ]);
  }, [id]);

  // Handle sending a message (volunteer responds to user's request)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "volunteer", text: newMessage },
      ]);
      setNewMessage(""); // Clear the input
      // Simulate a delay for the user's response (deaf user asking for more help)
      setTimeout(() => {
        setMessages([
          ...messages,
          { id: messages.length + 2, sender: "user", text: "Thanks! I need help scheduling a doctor’s appointment. Can you guide me through it?" },
        ]);
      }, 1500); // Longer delay to simulate processing or sign language response
    }
  };

  return (
    <>
      <UpperbarV />

      {/* Header Section */}
      <div className="bg-[#F2DF3A] p-10 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold text-[#0078AA]">Chat with {userName}</h1>
        <p className="mt-3 text-[#0078AA] font-semibold text-lg">
          Provide support to this deaf user via text or sign language
        </p>
      </div>

      {/* Chat Messages */}
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md h-96 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 p-3 rounded-lg max-w-xs ${
              message.sender === "volunteer" ? "bg-blue-100 ml-auto" : "bg-gray-200"
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
          placeholder="Type your message... (e.g., offer sign language support or guidance)"
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078AA]"
          aria-label="Chat message input for volunteer"
        />
        <button
          type="submit"
          className="bg-[#0078AA] text-white p-3 rounded-lg hover:bg-[#005d87] transition-colors"
          aria-label="Send message as volunteer"
        >
          Send
        </button>
      </form>

      <Footer />
    </>
  );
};

export default VolunteerChatInterface;