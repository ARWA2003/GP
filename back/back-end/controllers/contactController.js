import conmsgs from "../models/conmsgs.js";

// Add a new contact
export const addContact = async (req, res) => {
  try {
    const { name } = req.body;
    const email = req.body.email;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

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
    const email = req.query.email;
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

// Update contact (not yet used in frontend)
export const updateContact = async (req, res) => {
  try {
    const contact = await conmsgs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact." });
  }
};

// Delete a contact
export const deleteContact = async (req, res) => {
  try {
    const { contactName, email } = req.query;
    if (!contactName || !email) {
      return res.status(400).json({ error: "Contact name and email are required" });
    }

    const result = await conmsgs.findOneAndDelete({ email, contactName });
    if (!result) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ success: true, message: "Contact deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact." });
  }
};