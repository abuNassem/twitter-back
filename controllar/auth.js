const User = require("../model/user");
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();

const Register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const isFinde = await User.findOne({ email });
        
        if (isFinde) {
            return res.status(400).json({ message: 'email already exist' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        const accessToken = jsonWebToken.sign({ id: newUser._id }, process.env.JWT_SECRT,{expiresIn:'15m'});
                const refreshToken = jsonWebToken.sign({ id: newUser._id }, process.env.JWT_REFRESH_SECRET,{expiresIn:'15d'});
                res.cookie('token',refreshToken,{
                    httpOnly:false,
                    path:'/',
                    maxAge:15 * 24 * 60 * 60 * 1000 ,
                sameSite:'lax'              })

                 const token=req.cookie
    console.log( 'refes',token)
        return res.status(200).json({ 
            user: { name: newUser.name, email: newUser.email }, 
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isRegister = await User.findOne({ email });

        // 1. التحقق من وجود المستخدم
        if (!isRegister) {
            return res.status(400).json({ message: 'invalid email or password' });
        }
        
        const isMatch = await bcrypt.compare(password, isRegister.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'invalid email or password' });
        }

    
        const refreshToken = jsonWebToken.sign({ id: isRegister._id }, process.env.JWT_REFRESH_SECRET,{expiresIn:'15d'});
       res.cookie('token', refreshToken, {
    httpOnly: false, // لمنع الوصول إليه من JavaScript في المتصفح (مهم للحماية من XSS)
    secure: false, // محلياً، لا نحتاج إلى HTTPS
    sameSite: 'lax', // أو 'Strict' لمزيد من الأمان المحلي
    maxAge: 3600000 // 1 ساعة
});
  const token=req.cookies
    console.log( 'refes',token)
        const accessToken=jsonWebToken.sign({id:isRegister._id},process.env.JWT_SECRT,{expiresIn:'15m'})
        return res.status(200).json({ 
            message: 'login successfuly', 
            user: { 
                name: isRegister.name, 
                email: isRegister.email, 
                profileImage: isRegister.profileImage 
            },
        accessToken,refreshToken     });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { Register, Login }