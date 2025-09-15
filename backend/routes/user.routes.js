import express from "express";
import { registerUser, loginUser, logoutUser, isAuthUser } from "../controllers/user.controllers.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/is-auth", authUser, isAuthUser);

export default router;
