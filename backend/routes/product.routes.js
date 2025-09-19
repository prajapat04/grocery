import express from "express";

import { authSeller } from "../middleware/authSeller.js";
import { addProduct, changeStock, productList, productsById } from "../controllers/product.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();


router.post("/add", upload.array([image]), authSeller, addProduct);
router.post("/stock", authSeller, changeStock);
router.get("/list", productList);
router.get("/id", productsById);



export default router;



