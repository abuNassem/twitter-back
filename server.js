
const express = require('express')
const cors = require('cors')
const authRouter = require('./router/auth')
const userRouter = require('./router/user')
const postRouter = require('./router/post')
const { initSocket } = require('./socket/socket')
const commentRouter = require('./router/comment')
const reactRouter = require('./router/react')
const cookieParser = require('cookie-parser')
const refreshRouter = require('./router/refreshToken')
const notificationRouter = require('./router/notification')
const oAuthGoogle = require('./googleAuth/googleLogin')
const searchRouter = require('./router/search')
const { limiter } = require('./limiters/limiter')
require('./db/db')
const app = express()
const server = require('http').createServer(app)
initSocket(server)
app.use(cors({
    origin: ['http://localhost:3000', 'https://tiweet.netlify.app', 'https://twitter-m90z5umnq-qutaibas-projects-281fb24a.vercel.app'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],

}))
app.use(express.json())
app.use(cookieParser())
app.use(refreshRouter)
app.use(authRouter)
app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)
app.use(notificationRouter)
app.use(reactRouter)
app.use(searchRouter)

app.use(oAuthGoogle)




const port = process.env.PORT || 3001
server.listen(port, () => {
    console.log('successfully', `${port}`)
})
