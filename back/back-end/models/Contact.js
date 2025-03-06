import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: String,
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;

