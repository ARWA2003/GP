import conmsgs from "../models/conmsgs.js"; // Import the conmsgs model

// Add a new chat message
export const addChatMessage = async (req, res) => {
    try {
        const { contactName, message, type } = req.body;
        if (!contactName || !message) {
            return res.status(400).json({ error: "Contact name and message are required" });
        }

        // Find or create the conmsgs document for the contact
        let contactMessages = await conmsgs.findOne({ contactName });
        if (!contactMessages) {
            contactMessages = new conmsgs({ contactName, messages: [] });
        }

        // Add the new message to the messages array
        contactMessages.messages.push({ message, type });
        await contactMessages.save();

        res.json({ success: true, contactMessages });
    } catch (error) {
        res.status(500).json({ error: "Failed to save message." });
    }
};

// Get chat history for a contact
// Backend: getChatHistory function
export const getChatHistory = async (req, res) => {
    try {
        const { contactName } = req.query;
        console.log("Fetching chat history for:", contactName); // Debugging

        if (!contactName) {
            return res.status(400).json({ error: "Contact name is required" });
        }

        const contactMessages = await conmsgs.findOne({ contactName });

        console.log("Fetched chat data:", contactMessages); // Debugging

        if (!contactMessages) {
            return res.json({ messages: [] });
        }

        res.json({ messages: contactMessages.messages });
    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({ error: "Failed to fetch chat history." });
    }
};
