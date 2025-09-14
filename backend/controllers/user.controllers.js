import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success:false, message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success:false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7*24*60*60*1000
    });

    res.json({ success: true, message: "Registered successfully", user: { name: user.name, email: user.email } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success:false, message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success:false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success:false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7*24*60*60*1000
    });

    res.json({ success:true, message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success:false, message: "Internal server error" });
  }
};

// LOGOUT
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });
  res.json({ success:true, message: "Logged out successfully" });
};

// IS-AUTH
export const isAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json({ success:true, message: "Authenticated", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success:false, message: "Internal server error" });
  }
};
