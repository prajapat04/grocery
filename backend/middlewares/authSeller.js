import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    const token = req.cookies?.sellerToken;
    if (!token) {
      return res.status(401).json({ message: "No seller token, Unauthorized", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.seller = decoded.id;
    next();
  } catch (error) {
    console.error("Seller Authentication error:", error.message);
    return res.status(401).json({ message: "Seller Unauthorized", success: false });
  }
};
