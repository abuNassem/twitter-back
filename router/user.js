const { getUsers, EditProfile, GetAcount, getProfileUser } = require('../controllar/user')
const AuthUser = require('../middlware/authUser')

const userRouter=require('express').Router()

userRouter.get('/users',AuthUser,getUsers)
userRouter.get('/myAcount',AuthUser,GetAcount)
userRouter.get('/getProfile/:userId',AuthUser,getProfileUser)
userRouter.put('/editProfile',AuthUser,EditProfile)

module.exports=userRouter