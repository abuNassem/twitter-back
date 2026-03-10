const { CreateComment, getComment } = require('../controllers/comment')
const AuthUser = require('../middlewares/authUser')

const commentRouter=require('express').Router()

commentRouter.post('/createComment/:postId/:recipientId',AuthUser,CreateComment)

commentRouter.get('/getComment/:id',getComment)


module.exports=commentRouter
