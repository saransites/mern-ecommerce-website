// routes/cartRoutes.js
const express = require("express");
const Cart = require("../models/cartModal");
const Orders = require("../models/ordersModal");

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
    res.status(500).json({ message: error.message });
  }
};

const getOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    // Retrieve all orders for the given userId
    const orders = await Orders.find({ userId }); // Changed from findOne to find
    console.log(orders)
    // Check if any orders were found
    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this user." });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: err.message });
  }
};


const addOrders = async (req, res) => {
  
  const {
    title,
    description,
    price,
    paymentMethod,
    category,
    image,
    name,
    address,
    email,
    phone,
    city,
    state,
    zipCode,
    quantity,
    color,
    size,
  } = req.body;

  const { rate } = req.body.rating; // Assuming this is passed in the request body
  const { userId } = req.params; // Getting userId from URL params

  try {
    // Find if the user already has an order
    let existingOrder = await Orders.findOne({ userId, status: "Pending" });

    const newOrderItem = {
      title,
      description,
      price,
      quantity,
      size,
      color,
      image,
      rate,
    }

    // Calculate total amount for this item
    const itemTotalAmount = price * quantity;

    // If the user has an existing order
    if (existingOrder) {
      // Check if the same product exists in the order items
      const existingItemIndex = existingOrder.items.findIndex(
        (item) =>
          item.title === title && item.color === color && item.size === size
      );

      if (existingItemIndex !== -1) {
        // If the product exists, update the quantity and price
        existingOrder.items[existingItemIndex].quantity += quantity;
        existingOrder.items[existingItemIndex].price += itemTotalAmount;
      } else {
        // If the product doesn't exist, add it as a new item
        existingOrder.items.push(newOrderItem);
      }

      // Update the total amount of the order
      existingOrder.totalAmount += itemTotalAmount;

      // Save the updated order
      await existingOrder.save();
      res
        .status(200)
        .json({ message: "Order updated successfully", order: existingOrder });
    } else {
      // If no existing order, create a new order
      const orderItems = [newOrderItem];

      // Create a new order object
      const order = new Orders({
        userId,
        items: orderItems,
        totalAmount: itemTotalAmount,
        orderDate: new Date(),
        status: "Pending",
        paymentMethod,
        shippingAddress: {
          name,
          addressLine1: address,
          city,
          state,
          zipCode,
          country: "India", // Adjust based on your requirements
        },
      });

      // Save the new order to the database
      await order.save();
      res.status(201).json({ message: "Order created successfully", order });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Failed to create order", error: err.message });
  }
};


module.exports = {
  getCart,
  addCart,
  removeCart,
  updateCart,
  addOrders,
  getOrders,
};
