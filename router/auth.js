const express=require('express')
const { Register, Login } = require('../controllers/auth')
const { limiter } = require('../limiters/limiter')
const authRouter=express.Router()

authRouter.post('/register',limiter,Register)
authRouter.post('/login',limiter,Login)
module.exports=authRouter
