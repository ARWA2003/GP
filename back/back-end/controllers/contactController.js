import Contact from "../models/Contact.js"; // Ensure correct file extension

// Add a new contact
export const addContact = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        const contact = await new Contact({ name, phone, email }).save();
        res.json({ success: true, contact });
    } catch (error) {
        res.status(500).json({ error: "Failed to add contact." });
    }
};

// Get all contacts
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
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
