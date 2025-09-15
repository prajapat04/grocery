import express from "express";
import { loginSeller, logoutSeller, isAuthSeller } from "../controllers/seller.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();

router.post("/login", loginSeller);
router.post("/logout", authSeller, logoutSeller);
router.get("/is-auth", authSeller, isAuthSeller);

export default router;
