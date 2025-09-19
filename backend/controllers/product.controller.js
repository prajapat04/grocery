import {v2 as cloudinary} from "cloudinary"
import Product from "../models/product.model.js"

export const addProduct = async (req, res)=>{
  try {
    let productData = JSON.parse(req.body.productData)

    const images = req.files

    let imagesUrl = await Promise.all(
      images.map(async (item)=>{
        let result = await cloudinary.uploader.upload(item.path, 
          {resource_type: 'image'});
          return result.secure_url
      })
    )

    await Product.create({...productData, image:imagesUrl})

    res.json({success: true, message: "Product Added"})
  } catch (error) {
    console.log(error.message);
    res.json({success: false, message: error.message})
  }
}


//get products :/api/product/list

export const productList = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ products, success: true });
  } catch (error) {
   console.log(error.message);
    res.json({success: false, message: error.message})
  }
}

//get single pruduct :/api/product/id

export const productsById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }
    res.status(200).json({ product, success: true });
  } catch (error) {
   console.log(error.message);
    res.json({success: false, message: error.message})
  }
};


// change stock  :/api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body
    await Product.findByIdAndUpdate(id, { inStock })
    res.json({ success: true, message: "Stock updated successfully" });
  } catch (error) {
   console.log(error.message);
    res.json({success: false, message: error.message})
  }
};


