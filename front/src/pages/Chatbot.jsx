import { useState } from "react";
import { motion } from "framer-motion";
import Upperbar from "./Upperbar";
import Foooter from "./footer/footer";

// Define the circle animation
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

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    const res = await fetch("http://localhost:5005/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input, user_id: "001" }),
    });

    const data = await res.json();
    const botMessage = { sender: "bot", text: data.response };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <>
      <Upperbar />
      <div className="relative min-h-screen bg-gradient-to-br from-yellow-300 to-blue-400 p-6 flex flex-col items-center justify-between overflow-hidden">
        {/* Animated Circles */}
        <motion.div
          variants={circleAnimation}
          animate="animate"
          className="absolute w-[400px] h-[400px] bg-yellow-400 rounded-full top-[-150px] left-[-150px] blur-md opacity-50 shadow-lg"
        />
        <motion.div
          variants={circleAnimation}
          animate="animate"
          className="absolute w-[350px] h-[350px] bg-blue-400 rounded-full bottom-[-100px] right-[-100px] blur-md opacity-50"
        />

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-700 drop-shadow-md">
            MindCare Chatbot
          </h1>
          <p className="text-lg text-gray-800 mt-2">
            Your supportive companion for mental health
          </p>
        </div>

        {/* Chat Container */}
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 mt-4 mb-10 border-t-4 border-yellow-500">
          {/* Messages */}
          <div
            className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-100 rounded-xl"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #f1f1f1" }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "user"
                    ? "bg-yellow-600 text-white ml-auto"
                    : "bg-blue-200 text-gray-800"
                }`}
              >
                <strong>{msg.sender === "user" ? "You" : "MindCare"}: </strong>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="mt-6 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Share your thoughts or ask for support..."
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={sendMessage}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <Foooter />
    </>
  );
};

export default Chatbot;