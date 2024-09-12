const cartRouter=require('express').Router()

const {getCart,addCart, updateCart, removeCart}=require('../controllers/products.controller')

cartRouter.get('/:userId',getCart)
cartRouter.post('/:userId',addCart)
cartRouter.put("/:userId/:itemId",updateCart);
cartRouter.delete("/:userId/:itemId",removeCart);

module.exports=cartRouter