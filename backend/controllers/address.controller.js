import Address from "../models/address.model.js";

export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user; // set by authUser middleware

    if (!address) {
      return res.status(400).json({ success: false, message: "Address is required" });
    }

    const newAddress = await Address.create({
      address,      // address string
      user: userId, // matches schema field "user"
    });

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET /api/address/get
export const getAddress = async (req, res) => {
  try {
    const userId = req.user;
    const addresses = await Address.find({ user: userId }); // match schema field
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
