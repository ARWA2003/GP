import Contact from "../models/Contact.js"; // Ensure correct file extension
import conmsgs from "../models/conmsgs.js";
// Add a new contact
export const addContact = async (req, res) => {
    try {
        const { name } = req.body;
        const email = req.body.email || localStorage.getItem("userEmail"); // Get email from request or local storage
        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }

        // Check if contact already exists for this user
        const existingContact = await conmsgs.findOne({ email, contactName: name });
        if (existingContact) {
            return res.status(400).json({ error: "Contact already exists for this user" });
        }

        const contact = await new conmsgs({ email, contactName: name, messages: [] }).save();
        res.json({ success: true, contact });
    } catch (error) {
        res.status(500).json({ error: "Failed to add contact." });
    }
};

// Get all contacts for the logged-in user
export const getContacts = async (req, res) => {
    try {
        const email = req.query.email || localStorage.getItem("userEmail"); // Get email from query or local storage
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const contacts = await conmsgs.find({ email }, { contactName: 1, _id: 0 });
        console.log("Fetched Contacts:", contacts);
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch contacts." });
    }
};
// Update contact
export const updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, contact });
    } catch (error) {
        res.status(500).json({ error: "Failed to update contact." });
    }
};

// Delete contact
export const deleteContact = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Contact deleted." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete contact." });
    }
};
