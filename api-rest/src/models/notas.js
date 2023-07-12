import mongoose from "mongoose";

// Schema
const schema = mongoose.Schema({
    title: String,
    content: String
})

export default mongoose.model('Notas', schema)