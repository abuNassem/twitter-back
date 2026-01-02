
const express=require('express')
const cors=require('cors')
const authRouter = require('./router/auth')
const userRouter = require('./router/user')
const postRouter = require('./router/post')
const { initSocket } = require('./socket/socket')
const commentRouter = require('./router/comment')
require('./db/db')
const app=express()
const server=require('http').createServer(app)
initSocket(server)
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}))
app.use(express.json())
app.use(authRouter)
app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)


const port=3001|process.env.PORT
server.listen(port,()=>{
    console.log('successfully','http://localhost:3001')
})