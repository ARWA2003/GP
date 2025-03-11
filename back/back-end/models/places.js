import mongoose from "mongoose";

const placesSchema = new mongoose.Schema({

    name: String,
    price: String,
    time: String,
    location: String,
    image: String,
    category: String,
});


const Places = mongoose.model("places", placesSchema);
export default Places;