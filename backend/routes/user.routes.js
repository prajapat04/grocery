import express from "express";
import { registerUser, loginUser, logoutUser, isAuthUser } from "../controllers/user.controllers.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", isAuthUser, logoutUser);
router.get("/is-auth", isAuthUser, isAuthUser);

export default router;