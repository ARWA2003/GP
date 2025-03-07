import Chat from "../models/Chat.js"; // Ensure correct file extension

// Fetch latest 20 messages
export const getChatHistory = async (req, res) => {
    try {
        const chats = await Chat.find().sort({ createdAt: -1 }).limit(20);
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch chats." });
    }
};

// Add a new chat message
export const addChatMessage = async (req, res) => {
    try {
        const { message, type } = req.body;
        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }
        const newChat = new Chat({ message, type });
        await newChat.save();
        res.json({ success: true, chat: newChat });
    } catch (error) {
        res.status(500).json({ error: "Failed to save message." });
    }
};

