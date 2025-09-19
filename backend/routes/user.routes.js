import express from "express";
import { registerUser, loginUser, logoutUser, isAuthUser } from "../controllers/user.controllers.js";
import { authUser } from "../middleware/authUser.js"; // middleware to verify JWT

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/logout", authUser, logoutUser);
router.get("/is-auth", authUser, isAuthUser);

export default router;


