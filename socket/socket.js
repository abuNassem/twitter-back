const {Server}=require('socket.io');
const Comment = require('../model/comment');

let io;

exports.initSocket=(httpServer)=>{
    io=new Server(httpServer,{
        cors:{
            origin:'*'
        }
    })

    io.on('connection',socket=>{
    socket.on('send',data=>{
        const comment={
            text:data.text,
            name:data.name,
            profileImage:data.profileImage,
            createAt:new Date().toISOString()
        }
        io.emit('rePostComment',comment)
    })

    })


}



exports.getIo=()=>{
    if(!io){
        throw new Error('io not found')
    }
    return io
}