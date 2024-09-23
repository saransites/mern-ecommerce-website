const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
  color: {
    type: String,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

// Main Order Schema
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Assuming you have a User model
    required: true,
  },
  items: [OrderItemSchema], // Array of items in the order
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  shippingAddress: {
    name: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
},{timestamps:true});

const Orders = mongoose.model("Order", OrderSchema);

module.exports = Orders;
