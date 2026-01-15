const { CreateNotific, GetNotific, ReadNotific } = require('../controllar/notification')
const AuthUser = require('../middlware/authUser')
const notificationRouter=require('express').Router()

notificationRouter.post('/createNoti',AuthUser,CreateNotific)
notificationRouter.get('/getNoti/:id',AuthUser,GetNotific)
notificationRouter.put('/readNoti/:id',AuthUser,ReadNotific)



module.exports=notificationRouter