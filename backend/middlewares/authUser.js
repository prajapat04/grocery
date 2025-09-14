import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const token = req.cookies?.token; // safer access
    if (!token) {
      return res.status(401).json({ message: "No token, Unauthorized", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    req.user = decoded.id; // attach user id from token
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Token verification failed", success: false });
  }
};
