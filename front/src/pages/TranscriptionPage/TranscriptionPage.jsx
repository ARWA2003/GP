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
  const [studentSpeechText, setStudentSpeechText] = useState(""); // New state for student speech
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [isListening, setIsListening] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [fullLectureTranscript, setFullLectureTranscript] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recognition, setRecognition] = useState(null);

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

  const startLectureRecording = async () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || !navigator.mediaDevices?.getUserMedia) {
      alert("Your browser does not support required APIs.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    recognition.onresult = (event) => {
      let liveTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (!event.results[i].isFinal) continue;
        liveTranscript += event.results[i][0].transcript;
      }
      if (liveTranscript && liveTranscript !== transcript) {
        setTranscript(liveTranscript);
        setFullLectureTranscript((prev) => prev + (prev ? "\n" : "") + liveTranscript);
      }
    };

    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      setIsRecording(false);
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      recognition.start();
      setRecognition(recognition);

      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const destination = audioContext.createMediaStreamDestination();

      const biquadFilter = audioContext.createBiquadFilter();
      biquadFilter.type = "lowpass";
      biquadFilter.frequency.setValueAtTime(1000, audioContext.currentTime);

      source.connect(biquadFilter);
      biquadFilter.connect(destination);

      const recorder = new MediaRecorder(destination.stream);
      setMediaRecorder(recorder);
      recorder.start();

      recorder.ondataavailable = (e) => {
        console.log("Audio chunk available", e.data);
      };

      recorder.onstop = () => {
        console.log("Recording stopped");
      };
    } catch (err) {
      console.error("Failed to start recording:", err);
      setIsRecording(false);
    }
  };

  const stopLectureRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    if (recognition) {
      recognition.stop();
    }
    window.speechSynthesis.cancel();
    setIsRecording(false);
  };

  const handleSendMessage = async () => {
    if ((inputText.trim() || fullLectureTranscript.trim()) && selectedContact) {
      const messageText = inputText.trim()
        ? `Note: ${inputText.trim()}${fullLectureTranscript ? "\n" + fullLectureTranscript.trim() : ""}`
        : fullLectureTranscript.trim();
      const newMessage = { sender: "You", text: messageText, isVoice: false };
      try {
        await addChatMessage({ contactName: selectedContact, message: messageText, type: "speech" });
        setMessages((prev) => ({
          ...prev,
          [selectedContact]: [...(prev[selectedContact] || []), newMessage],
        }));
        setInputText("");
        setTranscript("");
        setFullLectureTranscript("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleStudentSpeak = () => {
    if (studentSpeechText.trim()) {
      speakText(studentSpeechText.trim());
      setFullLectureTranscript((prev) => prev + (prev ? "\n[Student]: " : "[Student]: ") + studentSpeechText.trim());
      setStudentSpeechText("");
    }
  };

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
      <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
        <div className="flex flex-1">
          {/* Sidebar */}
          <div
            className={`fixed md:relative ${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 overflow-hidden bg-white shadow-lg z-20 border-r border-gray-200`}
            aria-label="Lecture Transcripts"
          >
            {sidebarOpen && (
              <div className="p-4 h-full flex flex-col">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="self-end text-gray-600 hover:text-gray-800 transition-colors"
                >
                  ✕
                </button>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Lecture Transcripts</h2>
                <input
                  type="text"
                  placeholder="Search lectures"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="max-h-64 overflow-y-auto">
                  {filteredContacts.map((contact, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <button
                        onClick={() => handleSelectContact(contact)}
                        className={`flex-1 p-2 rounded text-left transition-colors ${
                          selectedContact === contact
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {contact}
                      </button>
                      <button
                        onClick={() => handleDeleteContact(contact)}
                        className="ml-1 p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                        title={`Delete ${contact}`}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Add new lecture"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddContact}
                    className="w-full bg-blue-500 text-white p-2 rounded mt-1 hover:bg-blue-600 transition"
                  >
                    Add Lecture
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Toggle Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute left-4 top-1/2 transform bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition shadow-lg z-10"
            >
              ☰
            </button>
          )}

          {/* Main Transcription Area */}
          <main className="flex-1 p-4 flex flex-col">
            {selectedContact ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Transcription for {selectedContact}
                </h2>
                <div className="flex-1 bg-white p-3 rounded shadow mb-2">
                  {messages[selectedContact]?.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 p-2 bg-gray-50 rounded border-l-2 ${
                        msg.text.startsWith("Note: ") ? "border-purple-500" : 
                        msg.text.startsWith("[Student]: ") ? "border-green-500" : "border-blue-500"
                      }`}
                    >
                      <p className="text-gray-700">{msg.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={startLectureRecording}
                    disabled={isRecording}
                    className={`px-2 py-1 rounded text-white ${
                      isRecording ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    🎙️ Start Transcription
                  </button>
                  <button
                    onClick={stopLectureRecording}
                    disabled={!isRecording}
                    className={`px-2 py-1 rounded text-white ${
                      isRecording ? "bg-red-500 hover:bg-red-600" : "bg-red-300 cursor-not-allowed"
                    }`}
                  >
                    ⏹️ Stop Transcription
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!fullLectureTranscript.trim() && !inputText.trim()}
                    className={`px-2 py-1 rounded text-white ${
                      fullLectureTranscript.trim() || inputText.trim() ? "bg-green-500 hover:bg-green-600" : "bg-green-300 cursor-not-allowed"
                    }`}
                  >
                    💾 Save Transcript
                  </button>
                </div>
                {transcript && (
                  <div className="mb-2 p-2 bg-white rounded shadow">
                    <h3 className="text-sm font-medium text-gray-600">Live Transcript:</h3>
                    <p className="text-gray-800 whitespace-pre-wrap">{transcript}</p>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2 bg-white p-2 rounded shadow">
                  <label className="text-sm text-gray-600">Language:</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="p-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en-US">English</option>
                    <option value="ar-SA">العربية (Arabic)</option>
                  </select>
                  {/* <select
                    value={selectedVoice?.name || ""}
                    onChange={(e) =>
                      setSelectedVoice(voices.find((v) => v.name === e.target.value))
                    }
                    className="p-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {voices.map((voice) => (
                      <option key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select> */}
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={speechRate}
                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    className="w-20 accent-blue-500"
                  />
                  <span className="text-sm text-gray-600">{speechRate}x</span>
                </div>

                <div className="flex items-center gap-2 mb-2 bg-white p-2 rounded shadow">
                  <input
                    type="text"
                    placeholder="Add notes or corrections..."
                    value={inputText}
                    onChange={(e) => {
                      console.log("Input changed:", e.target.value);
                      setInputText(e.target.value);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 p-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className={`p-1 rounded ${
                      inputText.trim() || fullLectureTranscript.trim() ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-300 cursor-not-allowed"
                    }`}
                    disabled={!inputText.trim() && !fullLectureTranscript.trim()}
                  >
                    Save
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-white p-2 rounded shadow">
                  <input
                    type="text"
                    placeholder="Type to speak..."
                    value={studentSpeechText}
                    onChange={(e) => setStudentSpeechText(e.target.value)}
                    className="flex-1 p-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleStudentSpeak}
                    className={`p-1 rounded bg-blue-500 hover:bg-blue-600 text-white ${
                      !studentSpeechText.trim() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!studentSpeechText.trim()}
                  >
                    Speak
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-600 text-lg">
                  Select a lecture to view or start transcribing
                </p>
              </div>
            )}
          </main>
        </div>
        <div className="p-2 bg-gray-200">
          <Foooter />
        </div>
      </div>
    </>
  );
};

export default TextToSpeechPage;