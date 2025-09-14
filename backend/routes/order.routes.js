import express from "express";


import { authSeller } from "../middlewares/authSeller.js";
import { getAllOrders, getUserOrders, placeOrderCOD } from "../controllers/order.controller.js";
import { authUser } from "../middlewares/authUser.js";

const router = express.Router();
router.post("/cod", authUser, placeOrderCOD);
router.get("/user", authUser, getUserOrders);
router.get("/seller", authSeller, getAllOrders);

export default router;
