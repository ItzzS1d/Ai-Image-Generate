import mongoose from "mongoose";

const dalleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const Dalle = mongoose.model("Dalle", dalleSchema);

export default Dalle;