import conmsgs from "../models/conmsgs.js"; // Import the conmsgs model

// Add a new chat message
export const addChatMessage = async (req, res) => {
    try {
        const { contactName, message, type, email } = req.body;
        if (!contactName || !message || !email) {
            return res.status(400).json({ error: "Contact name, message, and email are required" });
        }

        let contactMessages = await conmsgs.findOne({ email, contactName });
        if (!contactMessages) {
            contactMessages = new conmsgs({ email, contactName, messages: [] });
        }

        contactMessages.messages.push({ message, type });
        await contactMessages.save();

        res.json({ success: true, contactMessages });
    } catch (error) {
        res.status(500).json({ error: "Failed to save message." });
    }
};

// Get chat history for a contact
export const getChatHistory = async (req, res) => {
    try {
        const { contactName, email } = req.query;
        console.log("Fetching chat history for:", contactName, "Email:", email);

        if (!contactName || !email) {
            return res.status(400).json({ error: "Contact name and email are required" });
        }

        const contactMessages = await conmsgs.findOne({ email, contactName });

        if (!contactMessages) {
            return res.json({ messages: [] });
        }

        res.json({ messages: contactMessages.messages });
    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({ error: "Failed to fetch chat history." });
    }
};