const { login, signup } = require('../controllers/auth.controller')

const Authrouter=require('express').Router()

Authrouter.post('/login',login)
Authrouter.post('/signup',signup)

module.exports=Authrouter