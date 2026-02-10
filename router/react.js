const { addReact, deleteReact, getReact } = require('../controllers/react')
const AuthUser = require('../middlewares/authUser')

const reactRouter=require('express').Router()

reactRouter.post('/addReact/:postId', AuthUser,addReact)
reactRouter.delete('/deleteReact/:postId/:reactId', AuthUser,deleteReact)
reactRouter.get('/getReact',getReact)


module.exports=reactRouter
