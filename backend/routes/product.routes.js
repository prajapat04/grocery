import express from "express";

import { authSeller } from "../middleware/authSeller.js";
import { addProduct, changeStock, getProducts, getProductsById } from "../controllers/product.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();


router.post("/add-product",authSeller, upload.array("image"), addProduct);
router.get("/list", getProducts);
router.get("/id", getProductsById);
router.post("/stock", authSeller, changeStock);


export default router;
