import "dotenv/config";
import bcrypt from "bcryptjs";
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

const sampleBranches = ["Fiction", "Classics", "Dystopian"];

async function createDemoUser() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("123456", salt);

  const demoUser = new User({
    username: "demo",
    password: hashedPassword,
  });

  await demoUser.save();
  console.log("Demo user created!");
}

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

    // Create demo user if required
    await createDemoUser();

    // Seed sample users and create their trees
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

      savedUser.trees.push(savedTree._id); // Link the tree to the user
      await savedUser.save();

      // Create and attach leaves
      for (const leafData of sampleLeaves) {
        const newLeaf = new Leaf({
          userId: savedUser._id,
          ...leafData,
        });
        const savedLeaf = await newLeaf.save();

        savedTree.leaves.push(savedLeaf._id); // Attach the leaf to the tree
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
