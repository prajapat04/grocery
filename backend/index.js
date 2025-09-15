import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import { connectCloudinary } from './config/cloudinary.js';

// Routes
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
  "https://luminous-capybara-301d52.netlify.app",
  "https://grocery-1-tnq8.onrender.com"
];

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Proper CORS setup for cookies
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server requests
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS not allowed"));
    }
    return callback(null, true);
  },
  credentials: true
}));

// Serve uploaded images
app.use("/images", express.static("uploads"));

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error("Global error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
