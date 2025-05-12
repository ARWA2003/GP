 import  { useState } from "react";
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
          <div className="relative min-h-screen bg-gray-100 p-6 flex flex-col items-center overflow-hidden">
            {/* Animated Circles */}
            <motion.div
              variants={circleAnimation}
              animate="animate"
              className="absolute w-[400px] h-[400px] bg-yellow-200 rounded-full top-[-150px] left-[-150px] shadow-lg"
            ></motion.div>
    
            <motion.div
              variants={circleAnimation}
              animate="animate"
              className="absolute w-[350px] h-[350px] bg-blue-500 rounded-full bottom-[-100px] right-[-100px]"
            ></motion.div>
<div>
      <div style={{ height: 300, overflowY: "scroll", border: "1px solid #ccc", padding: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <strong>{msg.sender}: </strong>{msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
        style={{ width: "80%", padding: 8 }}
      />
      <button onClick={sendMessage} style={{ padding: 8 }}>Send</button>
      </div>
          </div>
    <Foooter />

    </>
  );
};

export default Chatbot;