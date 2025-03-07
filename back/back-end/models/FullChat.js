import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: String,
    type: { type: String, enum: ["text", "speech"] },
    timestamp: { type: Date, default: Date.now }
});

const fullChatSchema = new mongoose.Schema({
    contactName: { type: String, required: true },
    messages: [messageSchema]
});

// Keep only the latest 20 messages for each contact
fullChatSchema.pre("save", async function (next) {
    if (this.messages.length > 20) {
        this.messages.sort((a, b) => a.timestamp - b.timestamp); // Sort messages by timestamp
        this.messages.splice(0, this.messages.length - 20); // Remove the oldest messages
    }
    next();
});

const FullChat = mongoose.model("FullChat", fullChatSchema);
export default FullChat;