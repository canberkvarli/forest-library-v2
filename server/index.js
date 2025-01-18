import "dotenv/config";
import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";
import users from "./routes/api/users.js";
import trees from "./routes/api/trees.js";
import leaves from "./routes/api/leaves.js";

const app = express();
const PORT = process.env.PORT || 5001;

// MIDDLEWARE;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// MONGOOSE CONNECTION
mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err));

// ROUTES

app.use("/api/users", users);
app.use("/api/trees", trees);
app.use("/api/leaves", leaves);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
