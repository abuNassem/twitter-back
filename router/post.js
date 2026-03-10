const postRouter=require('express').Router()
const { CreatePost, GetPost, IncCommentCount } = require('../controllers/post')
const AuthUser=require('../middlewares/authUser')
postRouter.get('/getPost',GetPost)
postRouter.post('/createPost',AuthUser,CreatePost)
postRouter.put('/incCommentCount/:postId',AuthUser,IncCommentCount)


module.exports=postRouter
