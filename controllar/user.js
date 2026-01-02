const  User = require("../model/user")

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

const EditProfile=async(req,res)=>{
    try{
        const idUser=req.user._id
        const data=req.body
        await User.findByIdAndUpdate(idUser,data,{new:true})
        const user=await User.findById(idUser)
        res.status(200).json({user})

    }catch(error){
        console.log(error)
    }
}

module.exports={getUsers,EditProfile,GetAcount}