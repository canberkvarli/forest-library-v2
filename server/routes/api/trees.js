import { Router } from "express";
const router = Router();
import Tree from "../../models/Tree.js";
import User from "../../models/User.js";

// Test route
router.get("/test", (req, res) => {
  res.json({ msg: "This is the tree test route" });
});

// ✅ POST /api/trees - Create a new tree
router.post("/", async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if the user already has a tree
    const existingTree = await Tree.findOne({ userId }).populate("leaves");
    if (existingTree) {
      return res.status(400).json({ error: "User already has a tree." });
    }

    const newTree = new Tree({
      userId,
      leaves: [],
    });

    const savedTree = await newTree.save();

    // Update the user's `.tree` field to reference this new tree
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.tree = savedTree._id;
    await user.save();

    res.json(savedTree);
  } catch (err) {
    console.error("Error creating tree:", err);
    res.status(500).json({ error: "Failed to create tree" });
  }
});

// ✅ GET /api/trees - Fetch all trees
router.get("/", async (req, res) => {
  try {
    const trees = await Tree.find()
      .sort({ createdAt: -1 })
      .populate("leaves", "username");
    console.log("trees", trees);
    res.json(trees);
  } catch (err) {
    console.error("Error fetching trees:", err);
    res.status(500).json({ error: "Failed to fetch trees" });
  }
});

// ✅ GET /api/trees/:treeId - Fetch a single tree by ID
router.get("/:treeId", async (req, res) => {
  try {
    const tree = await Tree.findById(req.params.treeId).populate("leaves");
    if (!tree) {
      return res.status(404).json({ error: "Tree not found" });
    }
    res.json(tree);
  } catch (err) {
    console.error("Error fetching tree:", err);
    res.status(500).json({ error: "Failed to fetch tree" });
  }
});

// ✅ Example Profile Test Route
router.get("/profile", (req, res) => {
  res.send({ msg: "Testing profile route" });
});

export default router;
