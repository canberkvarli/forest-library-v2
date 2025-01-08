import { Router } from "express";
const router = Router();
import Tree from "../../models/Tree.js";

router.get("/test", (req, res) => {
  res.json({ msg: "This is the tree test route" });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const newTree = new Tree({
    userId: req.body.userId,
    headers: req.headers,
    url: req.originalUrl,
  });
  newTree.save().then((tree) => res.json(tree));
});

router.get("/", (req, res) => {
  Tree.find()
    .sort({ date: -1 })
    .then((trees) => res.json(trees))
    .catch(() => res.status(404).json({ error: "No tree found" }));
});

router.get("/profile", (req, res) => {
  res.send({ msg: "Testing profile route" });
});

// @route GET /api/trees/:id
// @desc Get tree by ID
// @access Private
router.get("/:id", (req, res) => {
  Tree.findById(req.params.id)
    .then((tree) => res.json(tree))
    .catch((err) => res.status(404).json({ error: "No tree found" }));
});

export default router;
