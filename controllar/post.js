const { validatePostContent } = require("../function/validatePostContent")
const Post = require("../model/post")

exports.GetPost=async(req,res)=>{
try{
    const idQuery=req.query.postId
    if(idQuery){
        const post=await Post.findOne({_id:idQuery}).populate('userId','profileImage name email').lean()
        if(post){
            console.log(post)
            return res.status(200).json({post})
        }else{
            return res.status(400).json({message:'this post are not found'})
        }
    }
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
    
    if(!validatePostContent(post.type,post.content)){
        return res.status(404).json({message:'invalid type post'})
    }

const text = post.content.text;

const matches = text.match(/#[\w\u0600-\u06FF]+/g);

const postHashtags = matches ? matches.map(tag => tag.substring(1)) : [];

    const posts=new Post({
        userId:idUser,
        postHashtags,
        ...post
    })
    await posts.save()
    res.status(200).json({posts})
}catch(error){
    console.error(error); 
  res.status(400).json({
    message: error.message,
  });
}
}

exports.IncCommentCount=async(req,res)=>{
    try{
        const postId=req.params.postId
        await Post.findOneAndUpdate({_id:postId},{$inc:{commentCount:1}})

    }catch(error){
        res.status(500).json({error})
    }
}


