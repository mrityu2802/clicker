import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  totalClicks: { type: Number, default: 0 },
  totalPoints: { type: Number, default: 0 },
  prizesWon: { type: Number, default: 0 },
});
const User = mongoose.model("User", userSchema);

export default User;
