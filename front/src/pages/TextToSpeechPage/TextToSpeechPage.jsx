import { useState, useEffect } from "react";
import Foooter from "../footer/footer";
import Upperbar from "../Upperbar";
import { getContacts, addContact, getChatHistory, addChatMessage, deleteContact } from "../../../api";

const TextToSpeechPage = () => {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newContact, setNewContact] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState({});
    const [inputText, setInputText] = useState("");
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [voices, setVoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechRate, setSpeechRate] = useState(1);
    const [isListening, setIsListening] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
    const [selectedLanguage, setSelectedLanguage] = useState("en-US");

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await getContacts();
                console.log("Backend Response (getContacts):", response.data);
                const contactsArray = response.data.map((contact) =>
                    contact.contactName || contact.name
                );
                setContacts(contactsArray);

                const initialMessages = {};
                contactsArray.forEach((contact) => {
                    initialMessages[contact] = [];
                });
                setMessages(initialMessages);
            } catch (error) {
                console.error("Failed to fetch contacts:", error);
            }
        };

        fetchContacts();

        const handleResize = () => setSidebarOpen(window.innerWidth > 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const loadVoices = () => {
            const availableVoices = synth.getVoices();
            setVoices(availableVoices);
            if (availableVoices.length > 0 && !selectedVoice) {
                setSelectedVoice(availableVoices[0]);
            }
        };

        synth.onvoiceschanged = loadVoices;
        loadVoices();

        return () => {
            synth.onvoiceschanged = null;
        };
    }, [selectedVoice]);

    const speakText = (text) => {
        if (!window.speechSynthesis || !text) return;

        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);

        if (selectedLanguage === "ar-SA") {
            utterance.voice = voices.find((v) => v.lang.startsWith("ar")) || voices[0];
        } else {
            utterance.voice = selectedVoice || voices[0];
        }

        utterance.rate = speechRate;
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (e) => console.error("TTS Error:", e);

        synth.cancel();
        synth.speak(utterance);
    };

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition is not supported in this browser. Try Chrome or Edge.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = selectedLanguage;

        recognition.onstart = () => {
            console.log("Speech recognition started");
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("Transcript received:", transcript);
            setInputText(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("STT Error:", event.error);
            setIsListening(false);
            if (event.error === "network") {
                alert("Speech recognition failed due to a network error. Please check your internet connection.");
            } else if (event.error === "no-speech") {
                alert("No speech detected. Please try again.");
            } else if (event.error === "not-allowed") {
                alert("Microphone access denied. Please allow microphone permissions.");
            } else {
                alert(`Speech recognition error: ${event.error}`);
            }
        };

        recognition.onend = () => {
            console.log("Speech recognition ended");
            setIsListening(false);
        };

        try {
            recognition.start();
        } catch (error) {
            console.error("Error starting recognition:", error);
            setIsListening(false);
            alert("Failed to start speech recognition. Please try again.");
        }
    };

    const handleSendMessage = async () => {
        if (inputText.trim() && selectedContact) {
            const newMessage = { sender: "You", text: inputText.trim(), isVoice: true };
            try {
                await addChatMessage({ contactName: selectedContact, message: inputText.trim(), type: "speech" });
                setMessages((prev) => ({
                    ...prev,
                    [selectedContact]: [...(prev[selectedContact] || []), newMessage],
                }));
                speakText(inputText.trim());
                setInputText("");
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        }
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleAddContact = async () => {
        if (newContact.trim() !== "" && !contacts.includes(newContact.trim())) {
            try {
                const response = await addContact({ name: newContact.trim() });
                console.log("Add Contact Response:", response.data);
                const addedContactName = response.data.contact.contactName || response.data.contact.name || newContact.trim();
                setContacts((prevContacts) => [...prevContacts, addedContactName]);
                setMessages((prev) => ({ ...prev, [addedContactName]: [] }));
                setNewContact("");
            } catch (error) {
                console.error("Failed to add contact:", error);
            }
        }
    };

    const handleSelectContact = async (contact) => {
        setSelectedContact(contact);
        try {
            const response = await getChatHistory(contact);
            console.log("Chat History Response:", response.data);
            setMessages((prev) => ({
                ...prev,
                [contact]: response.data.messages.map((msg) => ({
                    sender: msg.sender || "Bot",
                    text: msg.message,
                    isVoice: msg.type === "speech",
                })),
            }));
        } catch (error) {
            console.error("Failed to fetch chat history:", error);
        }
    };

    const handleDeleteContact = async (contact) => {
        if (window.confirm(`Are you sure you want to delete ${contact}?`)) {
            try {
                await deleteContact(contact);
                setContacts((prevContacts) => prevContacts.filter((c) => c !== contact));
                setMessages((prev) => {
                    const newMessages = { ...prev };
                    delete newMessages[contact];
                    return newMessages;
                });
                if (selectedContact === contact) {
                    setSelectedContact(null);
                }
            } catch (error) {
                console.error("Failed to delete contact:", error);
            }
        }
    };

    const filteredContacts = contacts.filter((contact) =>
        typeof contact === "string" && contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Upperbar />
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-400 via-blue-500 font-sans">
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <div
                        className={`fixed md:relative ${
                            sidebarOpen ? "w-72" : "w-0"
                        } transition-all duration-300 overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg z-20`}
                        aria-label="Contacts"
                    >
                        {sidebarOpen && (
                            <div className="p-6 h-full flex flex-col text-white">
                                {/* Close Button */}
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="self-end text-gray-300 hover:text-white transition-colors"
                                >
                                    ✕
                                </button>
                                {/* Search Input */}
                                <input
                                    type="text"
                                    placeholder="Search contacts"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                />
                                {/* Contacts List */}
                                <div className="max-h-96 overflow-y-auto">
                                    {filteredContacts.map((contact, index) => (
                                        <div key={index} className="flex items-center mb-3">
                                            <button
                                                onClick={() => handleSelectContact(contact)}
                                                className={`flex-1 p-3 rounded-lg text-left transition-colors ${
                                                    selectedContact === contact
                                                        ? "bg-yellow-500 text-white"
                                                        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                                                }`}
                                            >
                                                {contact}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteContact(contact)}
                                                className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-red-600 transition"
                                                title={`Delete ${contact}`}
                                            >
                                                x
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {/* Add Contact */}
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        placeholder="Add new contact"
                                        value={newContact}
                                        onChange={(e) => setNewContact(e.target.value)}
                                        className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                    />
                                    <button
                                        onClick={handleAddContact}
                                        className="w-full bg-yellow-500 text-white p-3 rounded-lg mt-2 hover:bg-yellow-600 transition"
                                    >
                                        Add Contact
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Toggle Button */}
                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition shadow-lg z-10"
                        >
                            ☰
                        </button>
                    )}

                    {/* Main Chat Area */}
                    <main className="flex-1 p-6 flex flex-col">
                        {selectedContact ? (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    Chat with {selectedContact}
                                </h2>
                                {/* Chat Messages */}
                                <div className="flex-1 bg-white p-4 rounded-xl shadow-lg overflow-y-auto mb-4">
                                    {messages[selectedContact]?.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`mb-4 p-4 rounded-xl max-w-md transition-all duration-300 ${
                                                msg.sender === "You"
                                                    ? "bg-yellow-100 ml-auto text-right"
                                                    : "bg-gray-200 mr-auto"
                                            }`}
                                        >
                                            <p className="font-semibold text-gray-800">{msg.sender}:</p>
                                            <p className="text-gray-700">{msg.text}</p>
                                            {msg.isVoice && (
                                                <button
                                                    onClick={() => speakText(msg.text)}
                                                    className="text-sm text-yellow-500 mt-1 hover:underline"
                                                >
                                                    🔊 Replay
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Language Selector */}
                                <div className="flex items-center space-x-3 mb-4">
                                    <label htmlFor="language-select" className="text-white font-semibold">
                                        Language:
                                    </label>
                                    <select
                                        id="language-select"
                                        value={selectedLanguage}
                                        onChange={(e) => setSelectedLanguage(e.target.value)}
                                        className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                    >
                                        <option value="en-US">English</option>
                                        <option value="ar-SA">العربية (Arabic)</option>
                                    </select>
                                </div>

                                {/* Speech Controls */}
                                <div className="flex items-center mb-4 space-x-3">
                                    <button
                                        onClick={() => speakText(inputText)}
                                        className={`p-3 rounded-lg transition-colors ${
                                            isSpeaking ? "bg-yellow-400 text-gray-800" : "bg-yellow-500 text-white hover:bg-yellow-600"
                                        }`}
                                        disabled={!inputText.trim()}
                                    >
                                        {isSpeaking ? "⏸️" : "▶️"}
                                    </button>
                                    <select
                                        value={selectedVoice?.name || ""}
                                        onChange={(e) =>
                                            setSelectedVoice(voices.find((v) => v.name === e.target.value))
                                        }
                                        className="p-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                    >
                                        {voices.map((voice) => (
                                            <option key={voice.name} value={voice.name}>
                                                {voice.name} ({voice.lang})
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="2"
                                        step="0.1"
                                        value={speechRate}
                                        onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                                        className="w-24 accent-yellow-500"
                                    />
                                    <span className="text-white">{speechRate}x</span>
                                </div>

                                {/* Message Input */}
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={startListening}
                                        className={`p-3 rounded-lg transition-colors ${
                                            isListening ? "bg-blue-500" : "bg-yellow-500 hover:bg-yellow-600"
                                        } text-white`}
                                        disabled={isListening}
                                        title={isListening ? "Listening..." : "Start Speech-to-Text"}
                                    >
                                        {isListening ? "🎙️" : "🎤"}
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Type or speak your message..."
                                        value={inputText}
                                        onChange={(e) => {
                                            console.log("Input changed:", e.target.value);
                                            setInputText(e.target.value);
                                        }}
                                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                        className="flex-1 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600 transition disabled:opacity-50"
                                        disabled={!inputText.trim()}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-white text-lg">Select a contact to start chatting</p>
                            </div>
                        )}
                    </main>
                </div>

                <div className="p-4">
                    <Foooter />
                </div>
            </div>
        </>
    );
};

export default TextToSpeechPage;