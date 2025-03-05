import express from "express";
import { addContact, getContacts, updateContact, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", addContact);
router.get("/contacts", getContacts);
router.put("/contact/:id", updateContact);
router.delete("/contact/:id", deleteContact);

export default router; // ✅ Correct ES Module export
