const postRouter=require('express').Router()
const { CreatePost, GetPost } = require('../controllar/post')
const AuthUser=require('../middlware/authUser')
postRouter.get('/getPost',AuthUser,GetPost)
postRouter.post('/createPost',AuthUser,CreatePost)

module.exports=postRouter