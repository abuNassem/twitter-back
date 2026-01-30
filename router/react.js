const { addReact, deleteReact, getReact } = require('../controllar/react')
const AuthUser = require('../middlware/authUser')

const reactRouter=require('express').Router()

reactRouter.post('/addReact/:postId', AuthUser,addReact)
reactRouter.delete('/deleteReact/:postId/:reactId', AuthUser,deleteReact)
reactRouter.get('/getReact',getReact)


module.exports=reactRouter