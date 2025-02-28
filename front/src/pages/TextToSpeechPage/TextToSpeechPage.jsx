import Foooter from "../footer/footer";
import Upperbar from "../Upperbar";
import { useState, useEffect } from "react";

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

    // Handle Search
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Add Contact
    const handleAddContact = () => {
        if (newContact.trim() !== "") {
            setContacts([...contacts, newContact.trim()]);
            setNewContact("");
        }
    };

    // Text to Speech
    const speakText = (text) => {
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

    // Handle Message Send
    const handleSendMessage = () => {
        if (inputText.trim()) {
            setMessages([...messages, { sender: "You", text: inputText.trim(), isVoice: true }]);
            speakText(inputText.trim());
            setInputText("");
        }
    };

    // Toggle Speech Recognition
    const toggleListening = () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        // Load voices when component mounts
        synth.getVoices();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900">
            <Upperbar />

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-1/5 bg-gray-800 p-4" aria-label="Contacts">
                    <input
                        type="text"
                        placeholder="Search contacts"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-2 mb-4 rounded border bg-gray-700 text-white"
                        aria-label="Search contacts"
                    />
                    <div className="max-h-96 overflow-y-auto">
                        {filteredContacts.map((contact, index) => (
                            <button
                                key={index}
                                className="block w-full bg-blue-600 text-white p-2 rounded mb-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                                aria-label={`Select ${contact}`}
                            >
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
                            className="w-full p-2 rounded border bg-gray-700 text-white"
                            aria-label="Add new contact"
                        />
                        <button
                            onClick={handleAddContact}
                            className="w-full bg-green-500 text-white p-2 rounded mt-2 hover:bg-green-600 focus:ring-2 focus:ring-green-400"
                            aria-label="Add contact"
                        >
                            Add Contact
                        </button>
                    </div>
                </aside>

                {/* Main Chat Area */}
                <main className="flex-1 bg-gray-700 p-4  text-white" aria-label="Chat area">
                    <div className="h-96 overflow-y-auto mb-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-4 p-4 rounded-lg ${msg.sender === "You" ? "bg-blue-500 ml-auto" : "bg-gray-600"} max-w-md`}
                            >
                                <p className="font-bold">{msg.sender}:</p>
                                <p>{msg.text}</p>
                                {msg.isVoice && (
                                    <button
                                        onClick={() => speakText(msg.text)}
                                        className="text-sm text-gray-200 mt-1"
                                        aria-label={`Replay ${msg.text}`}
                                    >
                                        🔊 Replay
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center mb-4 space-x-2">
                        <button
                            onClick={toggleListening}
                            className={`p-2 rounded ${isListening ? "bg-red-500" : "bg-green-500"}`}
                            aria-label={isListening ? "Stop listening" : "Start listening"}
                        >
                            {isListening ? "⏹️" : "🎤"}
                        </button>
                        <button
                            onClick={() => speakText(inputText)}
                            className={`p-2 rounded ${isSpeaking ? "bg-yellow-500" : "bg-blue-500"}`}
                            aria-label="Play text"
                        >
                            {isSpeaking ? "⏸️" : "▶️"}
                        </button>
                        <select
                            value={selectedVoice}
                            onChange={(e) => setSelectedVoice(e.target.value)}
                            className="p-2 rounded bg-gray-600"
                            aria-label="Select voice"
                        >
                            <option value="voice 1 : emilia">Voice 1: Emilia</option>
                            <option value="voice 2 : john">Voice 2: John</option>
                            <option value="voice 3 : mark">Voice 3: Mark</option>
                        </select>
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={speechRate}
                            onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                            className="w-24"
                            aria-label="Speech rate"
                        />
                        <span>{speechRate}x</span>
                    </div>

                    {/* Message Input */}
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            placeholder="Type or speak your message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            className="flex-1 p-2 rounded border bg-gray-600 text-white"
                            aria-label="Message input"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 p-2 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                            aria-label="Send message"
                        >
                            Send
                        </button>
                    </div>
                </main>
            </div>
            <Foooter />
        </div>
    );
};

export default TextToSpeechPage;