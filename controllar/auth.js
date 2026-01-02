const User = require("../model/user")
const bcrypt=require('bcrypt')
require('dotenv').config()
const jsonWebToken=require('jsonwebtoken')
const Register=async(req,res)=>{
    try{
            const {email,name,password}=req.body
            const isFinde=await User.findOne({email})
            
            if(isFinde){
    res.status(400).json({message:'email already exist'})
    return;
            }
        const newUser=new User({
            name,
            email,
            password
        })
        await newUser.save()
        const token= jsonWebToken.sign({id:newUser._id},process.env.JWT_SECRT)
        res.status(200).json({user:{name:newUser.name,email:newUser.email},token:token})
    }catch(error){
        console.log(error)
    }

}

const Login=async(req,res)=>{
    try{
        const user=req.body
        const isRegister=await User.findOne({email:user.email})
        if(!isRegister){
                        res.status(400).json({message:'invalid email or password'})
        }
        
        const decoded=await bcrypt.compare(user.password,isRegister.password)
        if(!decoded){
                        res.status(400).json({message:'invalid email or password'})

        }
        const token= jsonWebToken.sign({id:isRegister._id},process.env.JWT_SECRT)
        res.status(200).json({message:'login successfuly',user:{name:isRegister.name,email:isRegister.email,profileImage:isRegister.profileImage},token:token})
    }catch(error){
        res.json({error})
        console.log(error)
    }
}
module.exports={Register,Login}