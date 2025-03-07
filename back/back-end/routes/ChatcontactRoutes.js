import express from "express";
import { addContact, getContacts, updateContact, deleteContact } from "../controllers/contactController.js";
import { addChatMessage } from "../controllers/chatController.js";
import { getChatHistory } from "../controllers/chatController.js";
const router = express.Router();

router.post("/contact", addContact);
router.get("/contacts", getContacts);
router.put("/contact/:id", updateContact);
router.delete("/contact/:id", deleteContact);
router.post("/chat", addChatMessage);
// Get chat history for a contact
router.get("/chat", getChatHistory);
export default router; // ✅ Correct ES Module export