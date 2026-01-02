
const mongo=require('mongoose')

const commentSchema=new mongo.Schema({
    text:{type:String,min:1,required:true},
    postId:mongo.Schema.Types.ObjectId,
    nameUser:String,
    profileImage:String,
    userId:mongo.Schema.Types.ObjectId
},{timestamps:true})

const Comment=mongo.model('comment',commentSchema)
module.exports=Comment