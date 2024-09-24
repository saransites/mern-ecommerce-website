const { login, signup } = require('../controllers/auth.controller')
const userRouter = require('./userRouter')

const Authrouter=require('express').Router()

Authrouter.post('/login',login)
Authrouter.post('/signup',signup)
Authrouter.use('/user',userRouter)

module.exports=Authrouter