const express=require('express')
const { Register, Login } = require('../controllar/auth')
const authRouter=express.Router()

authRouter.post('/register',Register)
authRouter.post('/login',Login)
module.exports=authRouter