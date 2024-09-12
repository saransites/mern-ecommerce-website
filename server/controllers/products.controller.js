// routes/cartRoutes.js
const express = require("express");
const Cart = require("../models/cartModal");

const router = express.Router();

// Get cart for a user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add item to cart
const addCart = async (req, res) => {
  const {
    id,
    quantity,
    price,
    size,
    color,
    image,
    title,
    description,
    category,
  } = req.body;
  const {rate,count} = req?.body?.rating;
  const { userId } = req.params;
  if (!userId || userId === "undefined") {
    return res.status(403).json("please login and continue to buy product");
  }
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if not found
      cart = new Cart({
        userId: userId,
        items: [],
        totalAmount: 0,
      });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find((item) => item.title === title);

    if (existingItem) {
      // Update the existing item's quantity
      return res.status(409).json("This product is already in your cart");
    } else {
      // Add a new item to the cart
      cart.items.push({
        id,
        quantity,
        price,
        size,
        category,
        color,
        image,
        title,
        description,
        rating: {
          rate,
          count
        },
      });
    }

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// Update item quantity in cart
const updateCart = async (req, res) => {
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove item from cart
const removeCart = async (req, res) => {
  try {
    // Find the cart by userId
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the index of the item by itemId
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );

    // Check if the item exists in the cart
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Recalculate the total amount
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Save the updated cart
    await cart.save();

    // Respond with the updated cart
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCart,
  addCart,
  removeCart,
  updateCart,
};
