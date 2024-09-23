const cartRouter=require('express').Router()

const {getCart,addCart, updateCart, removeCart, addOrders, getOrders}=require('../controllers/products.controller');
const { authMiddleware } = require('../middleware/Authmiddleware');

cartRouter.get('/:userId',getCart)
cartRouter.post("/:userId", addCart);
cartRouter.put("/:userId/:itemId", updateCart);
cartRouter.delete("/:userId/:itemId", removeCart);
cartRouter.post("/orders/:userId", addOrders);
cartRouter.get("/orders/:userId", getOrders);

module.exports=cartRouter