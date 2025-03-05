import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;

