import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    message: String,
    type: { type: String, enum: ["text", "speech"] },
    timestamp: { type: Date, default: Date.now }
});

// Keep only the latest 20 messages
chatSchema.pre("save", async function (next) {
    const count = await mongoose.model("Chat").countDocuments();
    if (count >= 20) {
        await mongoose.model("Chat").findOneAndDelete({}, { sort: { timestamp: 1 } });
    }
    next();
});

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
