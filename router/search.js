const { suggestions, search, getUserByEmail } = require('../controllers/search')

const searchRouter=require('express').Router()

searchRouter.get('/suggestion',suggestions)
searchRouter.get('/search/:key',search)
searchRouter.get('/getByEmail/:email',getUserByEmail)



module.exports=searchRouter
