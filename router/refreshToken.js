const refreshRouter=require('express').Router()
const jwt=require('jsonwebtoken')

refreshRouter.post('/refreshToken',async(req,res)=>{
try{
   const token=req.body.token
    if(!token){
        return res.status(401).json({message:'no token provided'})
    }
    const decoded=jwt.verify(token,process.env.JWT_REFRESH_SECRET)

    const accessToken=jwt.sign({id:decoded.id},process.env.JWT_SECRT)
        res.status(200).json({accessToken})
}catch(error){
    res.status(500).json({error})
}
})

module.exports=refreshRouter