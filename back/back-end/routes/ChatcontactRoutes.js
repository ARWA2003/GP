import express from "express";
import { addContact, getContacts, updateContact, deleteContact } from "../controllers/contactController.js";
import { addChatMessage } from "../controllers/chatController.js";
import { getChatHistory } from "../controllers/chatController.js";
import { getJobs } from "../controllers/jobscontroller.js";
import { getPlaces } from "../controllers/placescontroller.js";
import { getBooks } from "../controllers/booksController.js";
import { getBank } from "../controllers/bankController.js";
const router = express.Router();

router.post("/contact", addContact);
router.get("/contacts", getContacts);
router.put("/contact/:id", updateContact);
router.delete("/contact", deleteContact);
router.post("/chat", addChatMessage);
// Get chat history for a contact
router.get("/chat", getChatHistory);
router.get("/jobs", getJobs);
router.get("/places", getPlaces);
router.get("/books", getBooks);
router.get("/bankjob", getBank);



export default router; // ✅ Correct ES Module export