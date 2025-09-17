import jwt from "jsonwebtoken";

// ---------------------------
// Seller Login
// ---------------------------
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate credentials (use DB if you want, right now env-based)
    if (email !== process.env.SELLER_EMAIL || password !== process.env.SELLER_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // ✅ Set token in HTTP-only cookie
    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Render = true, localhost = false
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("✅ Seller logged in, cookie set:", token);

    return res.json({ success: true, message: "Seller logged in successfully" });
  } catch (err) {
    console.error("❌ Seller login error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------------
// Seller Logout
// ---------------------------
export const sellerLogout = (req, res) => {
  res.clearCookie("sellerToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });
  return res.json({ success: true, message: "Seller logged out successfully" });
};

// ---------------------------
// Check Seller Auth
// ---------------------------
export const isAuthSeller = (req, res) => {
  try {
    if (!req.seller) {
      return res.status(401).json({ success: false, message: "Unauthorized seller" });
    }
    return res.json({ success: true, seller: req.seller });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
