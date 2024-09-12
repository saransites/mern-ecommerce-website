// models/Cart.js
const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
  },
  category: {
    type: String,
  },
  color: {
    type: String,
  },
  rating: {
    rate: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      required: true,
      min: 0,
    },
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  items: [CartItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;