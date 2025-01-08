// TreeSchema
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TreeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  leaves: [
    {
      type: Schema.Types.ObjectId,
      ref: "Leaf",
    },
  ],
  branches: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tree = model("Tree", TreeSchema);

export default Tree;
