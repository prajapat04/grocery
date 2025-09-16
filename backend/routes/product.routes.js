import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import { addProduct, changeStock, getProducts, getProductsById } from "../controllers/product.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// ✅ Add product (only seller can add, with image upload)
router.post(
  "/add-product",
  authSeller,
  upload.array("image", 5), // max 5 images
  addProduct
);

// ✅ Get all products
router.get("/list", getProducts);

// ✅ Update stock (seller only)
router.patch("/stock", authSeller, changeStock);

// ✅ Get single product by ID (keep this LAST to avoid route conflicts)
router.get("/:id", getProductsById);

export default router;
