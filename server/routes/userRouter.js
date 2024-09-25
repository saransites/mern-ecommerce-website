const { UserProfile, getAllUsers } = require('../controllers/user.controller')

const userRouter=require('express').Router()

userRouter.get('/:id',UserProfile)
userRouter.get("/", getAllUsers);

module.exports=userRouter