import express from "express";
import { isAuthSeller, sellerLogin, sellerLogout } from "../controllers/seller.controller.js";
import { authSeller } from "../middleware/authSeller.js"; // import middleware

const router = express.Router();

// Public route
router.post("/login", sellerLogin);

// Protected routes
router.get("/is-auth", authSeller, isAuthSeller);
router.get("/logout", authSeller, sellerLogout);

export default router;

