import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    const { sellerToken } = req.cookies; // read cookie
    if (!sellerToken) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // verify JWT
    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // attach seller data to request
    req.seller = decoded;
    next();
  } catch (error) {
    console.error("authSeller error:", error.message);
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};
