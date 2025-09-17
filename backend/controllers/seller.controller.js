import jwt from "jsonwebtoken";

// POST /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // For now, using env seller credentials
    if (email !== process.env.SELLER_EMAIL || password !== process.env.SELLER_PASSWORD) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    // Generate JWT
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // ✅ Set cookie properly for cross-origin (Netlify <-> Render)
    res.cookie("sellerToken", token, {
      httpOnly: true,
      secure: true,       // Render = HTTPS → must be true
      sameSite: "None",   // allow cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("✅ Seller logged in, cookie set:", token);

    res.json({ message: "Login successful", success: true });
  } catch (error) {
    console.error("Seller login error:", error.message);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// GET /api/seller/logout
export const sellerLogout = async (req, res) => {
  res.clearCookie("sellerToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.json({ message: "Logged out", success: true });
};

// GET /api/seller/is-auth
export const isAuthSeller = async (req, res) => {
  try {
    if (!req.seller) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    res.json({ message: "Seller authenticated", success: true, seller: req.seller });
  } catch (error) {
    res.status(500).json({ message: "Error checking auth", success: false });
  }
};
