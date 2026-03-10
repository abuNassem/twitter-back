const { CreateNotific, GetNotific, ReadNotific } = require('../controllers/notification')
const AuthUser = require('../middlewares/authUser')
const notificationRouter=require('express').Router()

notificationRouter.post('/createNoti',AuthUser,CreateNotific)
notificationRouter.get('/getNoti/:id',GetNotific)
notificationRouter.put('/readNoti/:id',AuthUser,ReadNotific)



module.exports=notificationRouter
