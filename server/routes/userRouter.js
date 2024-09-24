const { UserProfile } = require('../controllers/user.controller')

const userRouter=require('express').Router()

userRouter.get('/:id',UserProfile)

module.exports=userRouter