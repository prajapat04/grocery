import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import { connectCloudinary } from './config/cloudinary.js';

import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";

dotenv.config();
const app = express();

// Connect DB & Cloudinary
connectDB();
connectCloudinary();

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://magical-puppy-333d7b.netlify.app",
  "https://grocery-1-tnq8.onrender.com"
];

// Middlewares
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
  credentials: true // important to send cookies cross-origin
}));
app.use(cookieParser());

// Serve uploaded images
app.use("/images", express.static("uploads"));

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
