import Address from "../models/address.model.js";

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
     await Address.create({
      ...address,
      userId
    });
    res.status(201).json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get address:// /api/address/get
export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const addresses = await Address.find({ userId });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

