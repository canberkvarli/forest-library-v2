import mongoose from "mongoose";

const { Schema, model } = mongoose;

const LeafSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  review: {
    type: String,
    default: "",
  },
});

const Leaf = model("Leaf", LeafSchema);

export default Leaf;
