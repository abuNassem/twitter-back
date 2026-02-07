const express=require('express')
const { Register, Login } = require('../controllar/auth')
const { limiter } = require('../limater/limater')
const authRouter=express.Router()

authRouter.post('/register',limiter,Register)
authRouter.post('/login',limiter,Login)
module.exports=authRouter