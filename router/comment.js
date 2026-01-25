const { CreateComment, getComment } = require('../controllar/comment')
const AuthUser = require('../middlware/authUser')

const commentRouter=require('express').Router()

commentRouter.post('/createComment/:postId/:recipientId',AuthUser,CreateComment)

commentRouter.get('/getComment/:id',AuthUser,getComment)


module.exports=commentRouter