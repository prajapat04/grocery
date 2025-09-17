import jwt from "jsonwebtoken";

// Seller Login Controller
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check against env variables (or DB if you have one)
    if (email !== process.env.SELLER_EMAIL || password !== process.env.SELLER_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // ✅ Create JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // ✅ Set token in cookie
    res.cookie("sellerToken", token, {
      httpOnly: true,       // prevent JS access
      secure: true,         // must be true in production (HTTPS on Render)
      sameSite: "None",     // allow cross-site requests (Netlify → Render)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("✅ Seller logged in, cookie set:", token);

    return res.json({ success: true, message: "Seller logged in successfully" });
  } catch (err) {
    console.error("❌ Seller login error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
