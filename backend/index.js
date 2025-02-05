import express from "express";
import connectDB from "./lib/db.js";
import cors from "cors";
import dotenv from "dotenv";
import { clickHandler, getUser } from "./jobs/user.controller.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/user/:id", getUser);
app.post("/click", clickHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
