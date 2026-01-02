const { getUsers, EditProfile, GetAcount } = require('../controllar/user')
const AuthUser = require('../middlware/authUser')

const userRouter=require('express').Router()

userRouter.get('/users',AuthUser,getUsers)
userRouter.get('/myAcount',AuthUser,GetAcount)
userRouter.put('/editProfile',AuthUser,EditProfile)

module.exports=userRouter