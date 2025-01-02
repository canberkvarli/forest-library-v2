import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";
import Leaf from "../models/Leaf.js";
import Tree from "../models/Tree.js";

// Sample data for users and books (leaves)
const sampleUsers = [
  { username: "john_doe", password: "password123" },
  { username: "jane_smith", password: "password456" },
  { username: "susan_lee", password: "password789" },
  { username: "michael_james", password: "password101" },
  { username: "lucy_brown", password: "password202" },
  { username: "alex_green", password: "password303" },
  { username: "chris_white", password: "password404" },
  { username: "karen_black", password: "password505" },
  { username: "timothy_clark", password: "password606" },
  { username: "lisa_martin", password: "password707" },
];

const sampleLeaves = [
  { title: "The Alchemist", category: "Fiction", author: "Paulo Coelho" },
  {
    title: "To Kill a Mockingbird",
    category: "Classics",
    author: "Harper Lee",
  },
  { title: "1984", category: "Dystopian", author: "George Orwell" },
  { title: "Pride and Prejudice", category: "Romance", author: "Jane Austen" },
  {
    title: "The Catcher in the Rye",
    category: "Literary Fiction",
    author: "J.D. Salinger",
  },
  {
    title: "The Great Gatsby",
    category: "Classics",
    author: "F. Scott Fitzgerald",
  },
  { title: "Brave New World", category: "Dystopian", author: "Aldous Huxley" },
  { title: "Moby-Dick", category: "Adventure", author: "Herman Melville" },
  { title: "Wuthering Heights", category: "Gothic", author: "Emily Brontë" },
  {
    title: "War and Peace",
    category: "Historical Fiction",
    author: "Leo Tolstoy",
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear the current database (reset it)
    await User.deleteMany({});
    await Leaf.deleteMany({});
    await Tree.deleteMany({});

    console.log("Database reset!");

    // Create users and seeds for leaves (books)
    for (const userData of sampleUsers) {
      const newUser = new User(userData);
      const savedUser = await newUser.save();

      // Create a tree for the user
      const newTree = new Tree({
        userId: savedUser._id,
        leaves: [],
      });
      const savedTree = await newTree.save();

      // Update the user's tree reference
      savedUser.trees = savedTree._id;
      await savedUser.save();

      // Seed leaves (books) for the user
      for (const leafData of sampleLeaves) {
        const newLeaf = new Leaf({
          userId: savedUser._id,
          title: leafData.title,
          category: leafData.category,
          author: leafData.author,
        });
        const savedLeaf = await newLeaf.save();

        // Add the leaf to the user's tree
        savedTree.leaves.push(savedLeaf._id);
        await savedTree.save();
      }

      console.log(`User ${savedUser.username} seeded with tree and leaves.`);
    }

    console.log("Seeding completed!");
    process.exit();
  } catch (err) {
    console.error("Error seeding the database:", err);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
