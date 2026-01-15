const Post=require('../model/post')
const React=require('../model/react')
const { getIo } = require('../socket/socket')

exports.addReact=async(req,res)=>{
  try{
    const io=getIo()
    const userId=req.user._id
    const postId=req.params.postId
    await React.create({userId,postId})
    
      await Post.findByIdAndUpdate({_id:postId},{$inc:{reactCount:1}},{new:true})
      const posts=await Post.find().populate('userId','profileImage name email').lean()
    const reacts=await React.find()
            io.emit('reSendReact',reacts)
    io.emit("sendPost", posts);

    res.status(200).json({string:"success"})
  }catch(error){
    res.status(500).json({error:error.errorResponse.index})
  }
}
exports.deleteReact = async (req, res) => {
  try {
    const io = getIo()
    const userId = req.user._id
    const { postId } = req.params

  
    const deletedReact = await React.findOneAndDelete({
      userId,
      postId
    })

    if (!deletedReact) {
      return res.status(200).json({
        message: 'React already removed'
      })
    }

    await Post.findByIdAndUpdate(
      postId,
      { $inc: { reactCount: -1 } },
      { new: true }
    )

    const reacts = await React.find()
    const posts = await Post.find()
      .populate('userId', 'profileImage name email')
      .lean()

    io.emit('reSendReact', reacts)
    io.emit('sendPost', posts)

    res.status(200).json({ message: 'React deleted' })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}



exports.getReact=async(req,res)=>{
  try{
    const reacts=await React.find()
    res.status(200).json({reacts})

  }catch(error){
    res.status.json({error})
  }
}