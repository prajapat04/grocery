import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
     console.log("authSeller cookies:", req.cookies); 
    const { token } = req.cookies; // read cookie
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach seller data to request
    req.seller = decoded;
    next();
  } catch (error) {
    console.error("authSeller error:", error.message);
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};


