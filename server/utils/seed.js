import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";
import Leaf from "../models/Leaf.js";
import Tree from "../models/Tree.js";

// ✅ Sample Users (10 users)
const sampleUsers = [
  { username: "john_doe", password: "password123" },
  { username: "jane_smith", password: "password456" },
  { username: "michael_scott", password: "password789" },
  { username: "pam_beesly", password: "password111" },
  { username: "jim_halpert", password: "password222" },
  { username: "dwight_schrute", password: "password333" },
  { username: "kevin_malone", password: "password444" },
  { username: "angela_martin", password: "password555" },
  { username: "oscar_martinez", password: "password666" },
  { username: "stanley_hudson", password: "password777" },
];

// ✅ Sample Leaves (Books)
const sampleLeaves = [
  { title: "The Alchemist", category: "Fiction", author: "Paulo Coelho" },
  { title: "1984", category: "Dystopian", author: "George Orwell" },
  { title: "To Kill a Mockingbird", category: "Classic", author: "Harper Lee" },
  { title: "Brave New World", category: "Sci-Fi", author: "Aldous Huxley" },
  { title: "Moby Dick", category: "Adventure", author: "Herman Melville" },
  { title: "Pride and Prejudice", category: "Romance", author: "Jane Austen" },
  { title: "The Hobbit", category: "Fantasy", author: "J.R.R. Tolkien" },
  {
    title: "Crime and Punishment",
    category: "Philosophy",
    author: "Fyodor Dostoevsky",
  },
  {
    title: "The Catcher in the Rye",
    category: "Coming-of-Age",
    author: "J.D. Salinger",
  },
  { title: "War and Peace", category: "Historical", author: "Leo Tolstoy" },
];

// ✅ Sample Branches (Tree Categories)
const sampleBranches = [
  "Fiction",
  "Classics",
  "Sci-Fi",
  "Philosophy",
  "Adventure",
];

// ✅ Create Demo User
async function createDemoUser() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("123456", salt);

  const demoUser = new User({
    username: "demo",
    password: hashedPassword,
  });

  const savedDemoUser = await demoUser.save();

  // ✅ Create tree for demo user
  const demoTree = new Tree({
    userId: savedDemoUser._id,
    branches: sampleBranches.join(", "),
    leaves: [],
  });
  const savedDemoTree = await demoTree.save();

  // ✅ Assign tree ID to demo user
  savedDemoUser.tree = savedDemoTree._id;
  await savedDemoUser.save();

  // ✅ Assign random leaves to the demo user's tree
  for (let i = 0; i < 3; i++) {
    const leafData =
      sampleLeaves[Math.floor(Math.random() * sampleLeaves.length)];
    const newLeaf = new Leaf({
      userId: savedDemoUser._id,
      treeId: savedDemoTree._id,
      ...leafData,
    });
    const savedLeaf = await newLeaf.save();
    savedDemoTree.leaves.push(savedLeaf._id);
    await savedDemoTree.save();
  }

  console.log("✅ Demo user seeded with a tree and leaves!");
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // 🔄 Reset database
    await User.deleteMany({});
    await Leaf.deleteMany({});
    await Tree.deleteMany({});
    console.log("✅ Database reset!");

    // 🔹 Create demo user first
    await createDemoUser();

    // 🔹 Seed 10 Users with Trees & Leaves
    for (const userData of sampleUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const newUser = new User({
        username: userData.username,
        password: hashedPassword,
      });
      const savedUser = await newUser.save();

      // ✅ Create a tree for the user
      const newTree = new Tree({
        userId: savedUser._id,
        branches: sampleBranches.join(", "),
        leaves: [],
      });
      const savedTree = await newTree.save();

      // ✅ Assign tree ID to the user
      savedUser.tree = savedTree._id;
      await savedUser.save();

      // ✅ Assign 2-3 random leaves to each user
      for (let i = 0; i < 3; i++) {
        const leafData =
          sampleLeaves[Math.floor(Math.random() * sampleLeaves.length)];
        const newLeaf = new Leaf({
          userId: savedUser._id,
          treeId: savedTree._id,
          ...leafData,
        });
        const savedLeaf = await newLeaf.save();
        savedTree.leaves.push(savedLeaf._id);
        await savedTree.save();
      }

      console.log(
        `✅ Seeded user ${savedUser.username} with a tree and leaves.`
      );
    }

    console.log("🌱 Seeding completed successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
};

// 🚀 Run Seeding
seedDatabase();
