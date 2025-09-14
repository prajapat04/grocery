import jwt from "jsonwebtoken";

// Seller Login
export const loginSeller = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ success: false, message: "All fields are required" });

    // You can keep seller credentials in environment variables
    if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, message: "Seller logged in successfully" });
    }

    return res.status(401).json({ success: false, message: "Invalid credentials" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Seller Logout
export const logoutSeller = (req, res) => {
  res.clearCookie("sellerToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.json({ success: true, message: "Seller logged out successfully" });
};

// Check if seller is authenticated
export const isAuthSeller = (req, res) => {
  try {
    const { sellerToken } = req.cookies;
    if (!sellerToken) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (decoded.email !== process.env.SELLER_EMAIL)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    res.json({ success: true, message: "Seller is authenticated" });
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
