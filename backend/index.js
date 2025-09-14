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

connectDB();
connectCloudinary();

const allowedOrigins = [
  "http://localhost:5173",
  "https://magical-puppy-333d7b.netlify.app",
  "https://grocery-1-tnq8.onrender.com"
];

// **CORS setup**
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or curl
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("Not allowed by CORS"), false);
    }
    return callback(null, true);
  },
  credentials: true, // important for cookies
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
