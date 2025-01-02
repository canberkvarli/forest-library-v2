import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";
import Tree from "../models/Tree.js";
import Leaf from "../models/Leaf.js";

const resetDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");

    // Delete all documents in the collections
    await User.deleteMany();
    await Tree.deleteMany();
    await Leaf.deleteMany();

    console.log("Database reset successfully");
  } catch (err) {
    console.error("Error resetting database:", err);
  } finally {
    mongoose.connection.close();
    console.log("Connection closed");
  }
};

resetDatabase();
