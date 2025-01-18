import "dotenv/config";
import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import users from "./routes/api/users.js";
import trees from "./routes/api/trees.js";
import leaves from "./routes/api/leaves.js";

const app = express();
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || "production";

// MIDDLEWARE;
app.use(
  cors({
    origin: "https://forest-library-v2.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(json());
app.use(urlencoded({ extended: true }));

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err));

// ROUTES

// ✅ Root Route (to check if server is running)
app.get("/", (req, res) => {
  res.send("🌳 Forest Library Backend is Running!");
});

app.use("/api/users", users);
app.use("/api/trees", trees);
app.use("/api/leaves", leaves);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
