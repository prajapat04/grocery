import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    const { sellerToken } = req.cookies;
    if (!sellerToken) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // Optional: If you have a specific seller email
    if (decoded.email !== process.env.SELLER_EMAIL) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.seller = decoded;
    next();
  } catch (error) {
    console.error("Seller auth error:", error);
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
