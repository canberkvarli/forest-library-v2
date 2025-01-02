import { Router } from "express";
const router = Router();
import validateLeafInput from "../../validation/leaves";
import Leaf, {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../../models/Leaf.js";

router.get("/test", (req, res) => {
  res.json({ msg: "This is leaf route" });
});

router.get("/", (req, res) => {
  find()
    .sort({ date: -1 })
    .then((leaves) => res.json(leaves))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:user_id", (req, res) => {
  find({ user: req.params.user_id })
    .then((leaves) => res.json(leaves))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  findById(req.params.id)
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
  findByIdAndUpdate(
    req.params.id,
    { review: req.body.review },
    { new: true },
    (error, data) => {
      if (error) {
        res.json(error);
      } else {
        console.log(data);
        res.json(data);
      }
    }
  );
  // Leaf
  //     .findById(req.params.id)
  //     .then(leaf => res.json(leaf));
});

router.delete("/:id", (req, res) => {
  findByIdAndDelete(req.params.id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
      res.json(docs);
    }
  });
});

export default router;
