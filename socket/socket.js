const {Server}=require('socket.io');
const jwt=require('jsonwebtoken')



let io;

exports.initSocket=(httpServer)=>{
    io=new Server(httpServer,{
        cors:{
            origin:'*'
        }
    })

    io.on('connection',socket=>{
        const token = socket.handshake.auth?.token;
    if (!token) {
      console.log('❌ No token',token);
      return;
    }

        const decoded= jwt.verify(token,process.env.JWT_SECRT)
                  console.log(' token is',decoded.id);

        socket.join(decoded.id)
        console.log('is',decoded.id)


    })


}



exports.getIo=()=>{
    if(!io){
        throw new Error('io not found')
    }
    return io
}
