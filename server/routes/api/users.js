import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../../models/User.js";
import Tree from "../../models/Tree.js";
import validateRegisterInput from "../../validation/register.js";

const router = express.Router();

// Test Route
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

// @route POST /api/users/register
// @desc Register a new user
// @access Public
router.post(
  "/register",
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    // Use custom validation
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(200).json({ errors });
    }

    const { username, password } = req.body;

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(200)
          .json({ errors: { username: "Username is already taken" } });
      }

      // ✅ Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // ✅ Create new user
      const newUser = new User({ username, password: hashedPassword });
      const savedUser = await newUser.save();

      // ✅ Create a new tree associated with this user
      const newTree = new Tree({ userId: savedUser.id });
      const savedTree = await newTree.save();

      // ✅ Update the user with the tree ID
      savedUser.tree = savedTree._id;
      await savedUser.save();

      // ✅ Generate JWT token
      const payload = { id: savedUser.id, username: savedUser.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        success: true,
        token: `Bearer ${token}`,
        user: {
          id: savedUser.id,
          username: savedUser.username,
          tree: savedUser.tree,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// @route POST /api/users/login
// @desc Login user and return token
// @access Public
router.post(
  "/login",
  [
    check("username", "Username is required").notEmpty(),
    check("password", "Password is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const payload = { id: user.id, username: user.username };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({
        success: true,
        token: `Bearer ${token}`,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// @route GET /api/users
// @desc Get all users
// @access Private
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
