import Contact from "../models/Contact.js"; // Ensure correct file extension

// Add a new contact
export const addContact = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Name is required" });
        }
        const contact = await new Contact({ name }).save();
        res.json({ success: true, contact });
    } catch (error) {
        res.status(500).json({ error: "Failed to add contact." });
    }
};

// Get all contacts
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find(); // Fetch all contacts from the database
        const contactNames = contacts.map((contact) => contact.name); // Extract names
        res.json(contactNames); // Send array of contact names
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
