import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    console.log("🍪 Incoming cookies:", req.cookies);

    const token = req.cookies?.sellerToken;
    if (!token) {
      console.log("❌ No sellerToken found in cookies");
      return res.status(401).json({ message: "No seller token, Unauthorized", success: false });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded token:", decoded);
    } catch (err) {
      console.log("❌ JWT verification failed:", err.message);
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    req.seller = decoded.email;
    next();
  } catch (error) {
    console.error("Seller Authentication error:", error.message);
    return res.status(401).json({ message: "Seller Unauthorized", success: false });
  }
};
