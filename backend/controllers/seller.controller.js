import jwt from "jsonwebtoken";

// SELLER LOGIN
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Only allow the specific seller email
    if (email !== process.env.SELLER_EMAIL || password !== process.env.SELLER_PASSWORD) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Create JWT for seller
    const sellerToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("sellerToken", sellerToken, {
      httpOnly: true,
      secure: true, // must be true for production https
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ success: true, message: "Seller logged in successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// SELLER LOGOUT
export const sellerLogout = (req, res) => {
  res.clearCookie("sellerToken", {
    httpOnly: true,
    secure: true,
    sameSite: "None"
  });
  res.json({ success: true, message: "Seller logged out successfully" });
};

// IS-AUTH CHECK
export const isAuthSeller = (req, res) => {
  try {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (decoded.email !== process.env.SELLER_EMAIL) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.json({ success: true, message: "Seller is authenticated" });
  } catch (err) {
    console.log(err);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
