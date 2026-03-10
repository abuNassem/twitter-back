const  User = require("../model/user")
const  Post = require("../model/post")
const  Comment = require("../model/comment")
const  React = require("../model/react")




const getUsers=async(req,res)=>{
    try{
        const id=req.user._id      
          const users= await User.find({_id:{$ne:id}}).select('name profileImage email')
        if(!users){
            res.status(200).json({message:'not foun users'})
                            return;

        }
                    res.status(200).json({message:'successfully',users})

    }catch(error){
        console.log(error)
    }
}

const GetAcount=async(req,res)=>{
    try{
        const idUser=req.user._id
        const acount=await User.findById(idUser)
        if(!acount){
                    res.status(400).json({message:'user not found'})

        }
        res.status(200).json({acount})
    }catch(error){
        console.log(error)
    }
}

const getProfileUser=async(req,res)=>{
    try{
        const userId=req.params.userId
    
        const user=await User.findOne({_id:userId}).select('profileImage name email')
        if(!user){
            res.status(404).json({message:'this acount are not found'})
        }

        const post=await Post.find({userId}).populate('userId','profileImage name email').lean()
        const comments=await Comment.find({recipient:userId}).populate('userId','profileImage name email').lean()
        res.status(200).json({post,comments,user})

    }catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}

const EditProfile=async(req,res)=>{
    try{
        const idUser=req.user._id
        const data=req.body
     let userData={}
     if(data.name)userData['name']=data.name;
     if(data.profileImage)userData['profileImage']=data.profileImage
        await User.findByIdAndUpdate(idUser,userData,{new:true})
        const user=await User.findById(idUser)
        res.status(200).json({user})

    }catch(error){
        console.log(error)
    }
}

module.exports={getUsers,EditProfile,GetAcount,getProfileUser}
