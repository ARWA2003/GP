import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    JobTitle: String,
    Company: String,
    Location: String,
    JobType: String,
    Workplace: String,
    Experience: String,
    JobLink: String,
});

const Bank = mongoose.model("bankjob", bankSchema);
export default Bank;