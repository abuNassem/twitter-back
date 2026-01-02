const Post = require("../model/post")

exports.GetPost=async(req,res)=>{
try{
    const _id=req.user._id
const posts=await Post.find().populate('userId','profileImage name email').lean()
if(!posts){
    res.status(400).json({message:'no post '})
    return;
}
res.status(200).json({data:posts})
}catch(error){
    res.status(400).json({error})
}
}

exports.CreatePost=async(req,res)=>{
try{
    const idUser=req.user._id
    const post=req.body
    const posts=new Post({
        userId:idUser,
        ...post
    })
    await posts.save()
    res.status(200).json({posts})
}catch(error){
    res.status(400).json({error})
}
}