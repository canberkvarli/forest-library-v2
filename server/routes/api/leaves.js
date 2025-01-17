import { Router } from "express";
import validateLeafInput from "../../validation/leaves.js";
import Leaf from "../../models/Leaf.js";
import User from "../../models/User.js";
import Tree from "../../models/Tree.js";

const router = Router();

// Test Route
router.get("/test", (req, res) => {
  res.json({ msg: "This is the leaf route" });
});

// Get all leaves
router.get("/", (req, res) => {
  Leaf.find()
    .sort({ createdAt: -1 })
    .then((leaves) => res.json(leaves))
    .catch((err) => res.status(400).json(err));
});

// Get leaves by user ID
router.get("/user/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).populate({
      path: "tree",
      populate: {
        path: "leaves",
        model: "Leaf",
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.tree) {
      return res.status(404).json({ error: "Tree not found for this user." });
    }

    res.json(user.tree.leaves);
  } catch (err) {
    console.error("Error fetching leaves by user:", err);
    res.status(500).json({ error: "Failed to fetch leaves" });
  }
});

// Get a single leaf by ID
router.get("/:id", (req, res) => {
  Leaf.findById(req.params.id)
    .then((leaf) => res.json(leaf))
    .catch((err) => res.status(400).json(err));
});

// ✅ Create a new leaf and associate it with the user's tree
router.post("/", async (req, res) => {
  const { isValid, errors } = validateLeafInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  try {
    const { title, author, category, userId } = req.body;

    // ✅ Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Find the user's tree manually
    const tree = await Tree.findOne({ userId });
    if (!tree) {
      return res.status(404).json({ error: "Tree not found for this user." });
    }

    // ✅ Create and save the leaf
    const newLeaf = new Leaf({
      title,
      author,
      userId,
      treeId: tree._id, // ✅ Associate leaf with tree
      category,
    });

    const savedLeaf = await newLeaf.save();

    // ✅ Ensure `tree.leaves` exists as an array before pushing
    if (!tree.leaves) tree.leaves = [];
    tree.leaves.push(savedLeaf._id);
    await tree.save();

    res.json(savedLeaf);
  } catch (err) {
    console.error("Error saving leaf:", err);
    res.status(500).json({ error: "Failed to save leaf" });
  }
});

// Update a leaf's review
router.patch("/:id", (req, res) => {
  Leaf.findByIdAndUpdate(
    req.params.id,
    { review: req.body.review },
    { new: true }
  )
    .then((leaf) => {
      if (leaf) {
        res.json(leaf);
      } else {
        res.status(404).json({ error: "Leaf not found" });
      }
    })
    .catch((err) => res.status(500).json({ error: "Failed to update leaf" }));
});

// Delete a leaf by ID
router.delete("/:id", (req, res) => {
  Leaf.findByIdAndDelete(req.params.id)
    .then((deletedLeaf) => {
      if (deletedLeaf) {
        res.json(deletedLeaf);
      } else {
        res.status(404).json({ error: "Leaf not found" });
      }
    })
    .catch((err) => res.status(500).json({ error: "Failed to delete leaf" }));
});

export default router;
