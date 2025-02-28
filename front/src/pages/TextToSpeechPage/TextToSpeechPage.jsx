import { useState, useEffect } from "react";
import Foooter from "../footer/footer";
import Upperbar from "../Upperbar";

const TextToSpeechPage = () => {
    const [contacts, setContacts] = useState(["supermarket chat", "uber chat", "chat"]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newContact, setNewContact] = useState("");
    const [messages, setMessages] = useState([
        { sender: "John", text: "Hey, how are you?", isVoice: false },
        { sender: "Emilia", text: "I'm good, how about you?", isVoice: true }
    ]);
    const [inputText, setInputText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState("voice 1 : emilia");
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechRate, setSpeechRate] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768); // Sidebar closed by default on small screens

    useEffect(() => {
        const handleResize = () => setSidebarOpen(window.innerWidth > 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Initialize Speech APIs
    const synth = window.speechSynthesis;
    let recognition;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            setInputText(transcript);
        };
    }


    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleAddContact = () => {
        if (newContact.trim() !== "") {
            setContacts([...contacts, newContact.trim()]);
            setNewContact("");
        }
    };

    const speakText = (text) => {
        const synth = window.speechSynthesis;
        if (synth && text) {
            const utterance = new SpeechSynthesisUtterance(text);
            const voices = synth.getVoices();
            utterance.voice = voices.find(v => v.name.toLowerCase().includes(selectedVoice.split(':')[1].trim())) || voices[0];
            utterance.rate = speechRate;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            synth.speak(utterance);
        }
    };

    const handleSendMessage = () => {
        if (inputText.trim()) {
            setMessages([...messages, { sender: "You", text: inputText.trim(), isVoice: true }]);
            speakText(inputText.trim());
            setInputText("");
        }
    };


    const filteredContacts = contacts.filter((contact) => contact.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        // Load voices when component mounts
        synth.getVoices();
    }, []);
    return (
        <>
            <Upperbar />
            <div className="min-h-screen flex flex-col">
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className={`bg-gray-200 fixed md:relative ${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 overflow-hidden md:block`} aria-label="Contacts">
                        {sidebarOpen && (
                            <div className="p-4 h-full flex flex-col">
                                <button onClick={() => setSidebarOpen(false)} className="self-end">✖</button>
                                <input
                                    type="text"
                                    placeholder="Search contacts"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full p-2 mb-4 rounded border bg-gray-600 text-white"
                                    aria-label="Search contacts"
                                />
                                <div className="max-h-96 overflow-y-auto">
                                    {filteredContacts.map((contact, index) => (
                                        <button key={index} className="block w-full bg-blue-800 text-white p-2 rounded mb-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
                                            {contact}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        placeholder="Add new contact"
                                        value={newContact}
                                        onChange={(e) => setNewContact(e.target.value)}
                                        className="w-full p-2 rounded border bg-gray-600 text-white"
                                    />
                                    <button onClick={handleAddContact} className="w-full bg-yellow-400 text-white p-2 rounded mt-2 hover:bg-yellow-500">
                                        Add Contact
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Toggle Button */}
                    {!sidebarOpen && (
                        <button onClick={() => setSidebarOpen(true)} className="absolute left-2 top-1/2 bg-yellow-500 text-white p-2 rounded opacity-50">
                            ☰
                        </button>
                    )}

                    {/* Main Chat Area */}
                    <main className="flex-1 bg-yellow-100 p-4 text-white flex flex-col">
                        <div className="h-96 overflow-y-auto mb-4 flex-grow">
                            {messages.map((msg, index) => (
                                <div key={index} className={`mb-4 p-4 rounded-lg ${msg.sender === "You" ? "bg-blue-500 ml-auto" : "bg-gray-600"} max-w-md`}>
                                    <p className="font-bold">{msg.sender}:</p>
                                    <p>{msg.text}</p>
                                    {msg.isVoice && (
                                        <button onClick={() => speakText(msg.text)} className="text-sm text-gray-200 mt-1">
                                            🔊 Replay
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center mb-2 space-x-2 p-4">
                            <button onClick={() => setIsListening(!isListening)} className={`p-2 rounded ${isListening ? "bg-red-500" : "bg-blue-300"}`}>
                                {isListening ? "⏹️" : "🎤"}
                            </button>
                            <button onClick={() => speakText(inputText)} className={`p-2 rounded ${isSpeaking ? "bg-yellow-500" : "bg-blue-300"}`}>
                                {isSpeaking ? "⏸️" : "▶️"}
                            </button>
                            <select value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)} className="p-2 rounded bg-gray-600">
                                <option value="voice 1 : emilia">Voice 1: Emilia</option>
                                <option value="voice 2 : john">Voice 2: John</option>
                                <option value="voice 3 : mark">Voice 3: Mark</option>
                            </select>
                            <input type="range" min="0.5" max="2" step="0.1" value={speechRate} onChange={(e) => setSpeechRate(parseFloat(e.target.value))} className="w-24" />
                            <span>{speechRate}x</span>
                        </div>

                        {/* Message Input */}
                        <div className="p-4 flex items-center gap-2 w-full">
                            <input
                                type="text"
                                placeholder="Type or speak your message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                                className="flex-1 p-2 rounded border bg-gray-600 text-white"
                            />
                            <button onClick={handleSendMessage} className="bg-blue-500 p-2 rounded hover:bg-blue-600">
                                Send
                            </button>
                        </div>
                    </main>
                </div>

                <div className=" mb-4">
                    <Foooter />
                </div>
            </div>
        </>
    );
};

export default TextToSpeechPage;
