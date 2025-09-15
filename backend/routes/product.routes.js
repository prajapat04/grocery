import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import { addProduct, changeStock, getProducts, getProductsById } from "../controllers/product.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// Add product (seller only)
router.post("/add-product", authSeller, upload.array("image", 5), addProduct);

// Get all products
router.get("/list", getProducts);

// Get single product by ID
router.get("/:id", getProductsById);

// Update stock (seller only)
router.patch("/stock", authSeller, changeStock);

export default router;
