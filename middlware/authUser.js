const User =require('../model/user') 
const jwt=require('jsonwebtoken')
const authRouter = require('../router/auth')
require('dotenv').config()



 const AuthUser=async(req,res,next)=>{
    const authHeader=req.header('Authorization')
    if(!authHeader){
        res.status(400).json({message:'no token provider'})
                        return;
    }
    const token=authHeader.replace('Bearer ', '').trim()
    const decoded= jwt.verify(token,process.env.JWT_SECRT)
    const user=await User.findOne({_id:decoded.id}).select('name _id email profileImage')
    if(!user){
                res.status(400).json({message:'invalid token'})
                return;
    }
    req.user=user
    req.token=token
    next()
}

module.exports=AuthUser