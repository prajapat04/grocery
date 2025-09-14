import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
dotenv.config();

import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import addressRoutes from "./routes/address.routes.js";
import { connectCloudinary } from './config/cloudinary.js';

const app = express();

connectDB();
connectCloudinary();

// ✅ CORS Setup for local dev + Netlify + Render
const allowedOrigins = [
  "http://localhost:5173",
  "https://helpful-griffin-83ebf7.netlify.app",
  "https://grocery-1-tnq8.onrender.com"
];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin like Postman
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ API Endpoints
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes); 
app.use("/api/cart", cartRoutes); 
app.use("/api/order", orderRoutes); 
app.use("/api/address", addressRoutes); 

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
