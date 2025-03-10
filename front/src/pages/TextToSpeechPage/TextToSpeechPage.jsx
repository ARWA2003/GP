import { useState, useEffect } from "react";
import Foooter from "../footer/footer";
import Upperbar from "../Upperbar";
import { getContacts, addContact, getChatHistory, addChatMessage } from "../../../api";

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

    // Effect for fetching contacts (runs only once on mount)
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
    }, []); // Empty dependency array: runs only on mount

    // Effect for handling voices (runs when selectedVoice changes)
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
    }, [selectedVoice]); // Only re-runs when selectedVoice changes

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
                const addedContactName = response.data.contactName || response.data.contact?.name || newContact.trim();
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

    const filteredContacts = contacts.filter((contact) =>
        typeof contact === "string" && contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Upperbar />
            <div className="min-h-screen flex flex-col">
                <div className="flex flex-1">
                    <div
                        className={`bg-gray-200 fixed md:relative ${
                            sidebarOpen ? "w-64" : "w-0"
                        } transition-all duration-300 overflow-hidden md:block`}
                        aria-label="Contacts"
                    >
                        {sidebarOpen && (
                            <div className="p-4 h-full flex flex-col">
                                <button onClick={() => setSidebarOpen(false)} className="self-end">
                                    ✖
                                </button>
                                <input
                                    type="text"
                                    placeholder="Search contacts"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full p-2 mb-4 rounded border bg-gray-600 text-white"
                                />
                                <div className="max-h-96 overflow-y-auto">
                                    {filteredContacts.map((contact, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSelectContact(contact)}
                                            className={`block w-full p-2 rounded mb-2 ${
                                                selectedContact === contact ? "bg-blue-500" : "bg-blue-800"
                                            } text-white hover:bg-blue-700`}
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
                                        className="w-full p-2 rounded border bg-gray-600 text-white"
                                    />
                                    <button
                                        onClick={handleAddContact}
                                        className="w-full bg-yellow-400 text-white p-2 rounded mt-2 hover:bg-yellow-500"
                                    >
                                        Add Contact
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="absolute left-2 top-1/2 bg-yellow-500 text-white p-2 rounded opacity-50"
                        >
                            ☰
                        </button>
                    )}

                    <main className="flex-1 bg-yellow-100 p-4 text-white flex flex-col">
                        {selectedContact ? (
                            <>
                                <h2 className="text-lg font-bold text-black mb-2">
                                    Chat with {selectedContact}
                                </h2>
                                <div className="h-96 overflow-y-auto mb-4 flex-grow">
                                    {messages[selectedContact]?.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`mb-4 p-4 rounded-lg ${
                                                msg.sender === "You" ? "bg-blue-500 ml-auto" : "bg-gray-600"
                                            } max-w-md`}
                                        >
                                            <p className="font-bold">{msg.sender}:</p>
                                            <p>{msg.text}</p>
                                            {msg.isVoice && (
                                                <button
                                                    onClick={() => speakText(msg.text)}
                                                    className="text-sm text-gray-200 mt-1"
                                                >
                                                    🔊 Replay
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Language Selection */}
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="language-select" className="text-black font-bold">Language:</label>
                                    <select
                                        id="language-select"
                                        value={selectedLanguage}
                                        onChange={(e) => setSelectedLanguage(e.target.value)}
                                        className="p-2 rounded bg-gray-600 text-white"
                                    >
                                        <option value="en-US">English</option>
                                        <option value="ar-SA">العربية (Arabic)</option>
                                    </select>
                                </div>

                                {/* Voice Selection and Speech Rate */}
                                <div className="flex items-center mb-2 space-x-2 p-4">
                                    <button
                                        onClick={() => speakText(inputText)}
                                        className={`p-2 rounded ${isSpeaking ? "bg-yellow-500" : "bg-blue-300"}`}
                                        disabled={!inputText.trim()}
                                    >
                                        {isSpeaking ? "⏸️" : "▶️"}
                                    </button>
                                    <select
                                        value={selectedVoice?.name || ""}
                                        onChange={(e) =>
                                            setSelectedVoice(voices.find((v) => v.name === e.target.value))
                                        }
                                        className="p-2 rounded bg-gray-600 text-white"
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
                                        className="w-24"
                                    />
                                    <span>{speechRate}x</span>
                                </div>

                                {/* Message Input with Speech-to-Text */}
                                <div className="p-4 flex items-center gap-2 w-full">
                                    <button
                                        onClick={startListening}
                                        className={`p-2 rounded ${
                                            isListening ? "bg-red-500" : "bg-green-500"
                                        }`}
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
                                        className="flex-1 p-2 rounded border bg-gray-600 text-white"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        className="bg-blue-500 p-2 rounded hover:bg-blue-600"
                                        disabled={!inputText.trim()}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-black">Select a contact to start chatting</p>
                        )}
                    </main>
                </div>

                <div className="mb-4">
                    <Foooter />
                </div>
            </div>
        </>
    );
};

export default TextToSpeechPage;