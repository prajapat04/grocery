import express from "express";
import { isAuthSeller, sellerLogin, sellerLogout } from "../controllers/seller.controller.js";


const router = express.Router();

router.post('/login', sellerLogin);
router.get('/is-auth', isAuthSeller, isAuthSeller);
router.post('/logout', isAuthSeller, sellerLogout);

export default router;