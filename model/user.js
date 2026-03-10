const mongo=require('mongoose')
const validate=require('validator')
const bcrypt=require('bcrypt')
const userSchema=new mongo.Schema({
    name:String,
    email:{type:String,validate:(value)=>{
        if(!validate.isEmail(value)){
            throw Error ('invalid email')
        }
    }},
    googleId:String,
    password:String,
    image:String,
    profileImage:{type:String || null,default:null},
    coverImage:String,
},{timestamps:true})

userSchema.pre('save',async function () {
    const user=this
    if(user.isModified('password')){
        const hashed=await bcrypt.hash(user.password,8)
        user.password=hashed
    }
})

userSchema.index({name:1})


const User=mongo.model('user',userSchema)
module.exports=User
