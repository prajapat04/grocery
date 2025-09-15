import Seller from "../models/seller.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ----------------------------
// LOGIN SELLER
// ----------------------------
export const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ sign with seller email (matches authSeller.js)
    const token = jwt.sign({ email: seller.email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login successful",
      seller: { name: seller.name, email: seller.email },
    });
  } catch (error) {
    console.error("loginSeller error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ----------------------------
// LOGOUT SELLER
// ----------------------------
export const logoutSeller = (req, res) => {
  res.clearCookie("sellerToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ success: true, message: "Logged out successfully" });
};

// ----------------------------
// CHECK AUTHENTICATION
// ----------------------------
export const isAuthSeller = async (req, res) => {
  try {
    // ✅ use req.seller (set in authSeller middleware)
    const seller = await Seller.findOne({ email: req.seller }).select("-password");
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    res.json({ success: true, message: "Seller authenticated", seller });
  } catch (err) {
    console.error("isAuthSeller error:", err);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
