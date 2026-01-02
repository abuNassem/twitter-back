const Comment = require("../model/comment")


exports.CreateComment=async(req,res)=>{
    try{
        const user=req.user
        const postId=req.params.id
        const comment=req.body.text
        const newComment=new Comment({
            text:comment,
            nameUser:user.name,
            profileImage:user.profileImage,
            userId:user._id,
            postId,
        })
        await newComment.save()
        res.status(200).json({newComment})
    }
    catch(err){
        console.log(err)
    }
}


exports.getComment=async(req,res)=>{
    try{
        const postId=req.params.id
        const comments=await Comment.find({postId})
    
       console.log('don')
        res.status(200).json({comments})
    }
    catch(err){
        console.log(err)
    }
}