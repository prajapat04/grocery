import User from "../models/user.model.js";

// Update user cart: /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const userId = req.user; // set by authUser middleware
    let { cartItems } = req.body;

    if (!cartItems || typeof cartItems !== "object") {
      cartItems = {};
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true, select: "cartItems" } // only return cartItems
    );

    if (!updateUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cartItems: updateUser.cartItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
