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
    .catch((err) => res.status(404).json({ notreefound: "No tree found" }));
});

router.get("/profile", (req, res) => {
  res.send({ msg: "Testing profile route" });
});

export default router;
