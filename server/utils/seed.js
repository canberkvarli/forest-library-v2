import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";
import Leaf from "../models/Leaf.js";
import Tree from "../models/Tree.js";

// Sample data
const sampleUsers = [
  { username: "john_doe", password: "password123" },
  { username: "jane_smith", password: "password456" },
];

const sampleLeaves = [
  { title: "The Alchemist", category: "Fiction", author: "Paulo Coelho" },
  { title: "1984", category: "Dystopian", author: "George Orwell" },
];

// Branches data (if applicable)
const sampleBranches = ["Fiction", "Classics", "Dystopian"];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Reset database
    await User.deleteMany({});
    await Leaf.deleteMany({});
    await Tree.deleteMany({});
    console.log("Database reset!");

    for (const userData of sampleUsers) {
      const newUser = new User(userData);
      const savedUser = await newUser.save();

      // Create a tree for the user
      const newTree = new Tree({
        userId: savedUser._id,
        branches: sampleBranches.join(", "), // Joining branches as a string
        leaves: [],
      });
      const savedTree = await newTree.save();

      savedUser.trees = savedTree._id;
      await savedUser.save();

      // Create and attach leaves
      for (const leafData of sampleLeaves) {
        const newLeaf = new Leaf({
          userId: savedUser._id,
          ...leafData,
        });
        const savedLeaf = await newLeaf.save();

        savedTree.leaves.push(savedLeaf._id);
        await savedTree.save();
      }

      console.log(`Seeded user ${savedUser.username} with a tree and leaves.`);
    }

    console.log("Seeding completed successfully!");
    process.exit();
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedDatabase();
