
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
require('./db/db')
const app = express()
const server = require('http').createServer(app)
initSocket(server)

const allowedOrigins = [
    'http://localhost:3000',
    'https://tiweet.netlify.app',
    'https://twitter-m90z5umnq-qutaibas-projects-281fb24a.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
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




const port = 3001
server.listen(port, () => {
    console.log('successfully', `${port}`)
})
