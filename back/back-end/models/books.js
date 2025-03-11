import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({

    name: String,
    description: String,
    image: String,
    downloadlink:String,
    buylink: String,
});


const Books = mongoose.model("books1", booksSchema);
export default Books;