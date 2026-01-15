const Notific = require("../model/notifaction")
const {getIo}=require('../socket/socket')

exports.CreateNotific=async(req,res)=>{
try{
    const io=getIo()

    const id=req.user.id
    const notific=req.body
    const isSendNoti=await Notific.findOne({recipient:notific.recipientId,type:notific.type})
    if(isSendNoti){
        console.log('already')
        return ;
    }
 const newNotific=new Notific({
        recipient:notific.recipientId,
        sender:id,
        type:notific.type,
        text:notific.text?notific.text:null,
        isRead:false,
        post:notific.postId
    })
    await newNotific.save()
        console.log('noooo',newNotific)

 const notifics=await Notific.find({recipient:id})
  .populate('sender','-password -updatedAt -createAt -__v -createdAt')

    const unReadNoti=await Notific.countDocuments({isRead:false,recipient:notific.recipientId})
    io.to(notific.recipientId).emit('noti:update',{
        unReadNoti,
        noti:notifics
    })
    res.status(200).json({newNotific})
}catch(error){
    console.log(error)
    res.status(500).json({error})
}
}

exports.GetNotific=async(req,res)=>{
try{
    const id=req.params.id
  const notifics=await Notific.find({recipient:id})
  .populate('sender','-password -updatedAt -createAt -__v -createdAt')
    res.status(200).json({notifics})
}catch(error){
    console.log(error)
    res.status(500).json({error})
}
}


exports.ReadNotific=async(req,res)=>{
    try{
            const io=getIo()
        const idUser=req.user._id
        const idNoti=req.params.id
        const updatedNoti=await Notific.findOneAndUpdate({_id:idNoti},{isRead:true},{new:true})
        const noti=await Notific.find({recipient:idUser})
    const unReadNoti=await Notific.countDocuments({recipient:idUser,isRead:false})


    io.to(idUser.toString()).emit('noti:update',{
        noti,
        unReadNoti
    })

        res.status(200).json({updatedNoti})
    }catch(err){
        res.status(500).json({err})
        console.log(err)
    }
}