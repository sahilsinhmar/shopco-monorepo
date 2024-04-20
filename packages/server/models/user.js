import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      requred: [true, "Please provide password"],
      unique: true,
      min: 6,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
