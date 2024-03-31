import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide every required field" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const tempUser = { name, email, password: hashedPassword, isAdmin };

    const user = await User.create({ ...tempUser });
    res.status(201).json({
      status: "SUCCESS",
      msg: "User created successfully",
      user: user.email,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide both email and password" });
    }
    const tempUser = await User.findOne({ email, isAdmin: false });

    if (!tempUser) return res.status(400).json({ msg: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password, tempUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const token = jwt.sign({ id: tempUser._id }, process.env.JWT_SECRET);
    const user = { ...tempUser._doc };
    delete user.password;

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide both email and password" });
    }

    const tempUser = await User.findOne({ email, isAdmin: true });

    if (!tempUser)
      return res
        .status(400)
        .json({ msg: "User does not exist or user is not admin" });

    const isPasswordCorrect = await bcrypt.compare(password, tempUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const token = jwt.sign({ id: tempUser._id }, process.env.JWT_SECRET);
    const user = { ...tempUser._doc };
    delete user.password;

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
