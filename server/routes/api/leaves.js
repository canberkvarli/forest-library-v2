import { Router } from "express";
const router = Router();
import validateLeafInput from "../../validation/leaves.js";
import Leaf from "../../models/Leaf.js";

router.get("/test", (req, res) => {
  res.json({ msg: "This is leaf route" });
});

router.get("/", (req, res) => {
  Leaf.find()
    .sort({ date: -1 })
    .then((leaves) => res.json(leaves))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:user_id", (req, res) => {
  Leaf.find({ user: req.params.user_id })
    .then((leaves) => res.json(leaves))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  Leaf.findById(req.params.id)
    .then((leaf) => res.json(leaf))
    .catch((err) => res.status(400).json(err));
});

router.post("/", (req, res) => {
  const { isValid, errors } = validateLeafInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const newLeaf = new Leaf({
      title: req.body.title,
      userId: req.body.userId,
      category: req.body.category,
    });
    newLeaf.save().then((leaf) => res.json(leaf));
  } catch (err) {
    res.status(400).json(err);
  }
});

router.patch("/:id", (req, res) => {
  // Leaf
  //     .findByIdAnd(req.params.id)
  //     .update({review: req.body.review})
  //     .then(leaf => leaf.save());
  Leaf.findByIdAndUpdate(
    req.params.id,
    { review: req.body.review },
    { new: true }
  ).then((leaf) => {
    if (leafg) {
      res.json(leaf);
    } else {
      res.status(404).json({ error: "Leaf not found" });
    }
  });
  // Leaf
  //     .findById(req.params.id)
  //     .then(leaf => res.json(leaf));
});

router.delete("/:id", (req, res) => {
  Leaf.findByIdAndDelete(req.params.id).then((deletedLeaf) => {
    if (deletedLeaf) {
      res.json(deletedLeaf);
    } else {
      res.status(404).json({ error: "Leaf not found" });
    }
  });
});

export default router;
