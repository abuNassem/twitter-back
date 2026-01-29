const oAuthGoogle=require('express').Router()
require('dotenv').config()
const session = require('express-session');
const passport = require('passport');
const AuthUser=require('../middlware/authUser')
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

oAuthGoogle.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

oAuthGoogle.use(passport.initialize());

oAuthGoogle.use(passport.session());

// 🔹 Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:3001/auth/google/callback`
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile); // هنا ممكن تخزن المستخدم في DB
  }
));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

oAuthGoogle.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'],  prompt: 'select_account' })
  
);


oAuthGoogle.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  async(req, res) => {
     try {
        const randomPass=Math.floor(Math.random()*1000000000)
    if (!req.isAuthenticated()) {
      return res.status(404).json({ message: 'unathuntaction' }) 
    }
            
    const email=req.user.emails[0].value
      let user = await User.findOne({ email })

    if(!user){
        user=new User({
            name:req.user.displayName,
            email,
            password:randomPass,
            profileImage:req.user.photos[0]?.value || null
        })
        user.save()
        
    }

     const refreshToken=jwt.sign({id:user._id},process.env.JWT_REFRESH_SECRET,{expiresIn:'15d'})
    


           return res.redirect(`http://localhost:3000/?token=${refreshToken}`); 
           

    
  } catch (error) {
    console.log(error)
    return res.status(400).json(error) 
  }
   
  }
);
oAuthGoogle.get('/auth/profile',AuthUser,async(req,res)=>{
    try{
        const userId=req.user._id
        const user=await User.findOne({_id:userId})
        if(!user){
            return res.status(400).json({message:'user not found'})
        }
        console.log('userrr',user)
      res.status(200).json({user})
            }
    catch(error){
        res.status(400).json(error)
        }
})
module.exports=oAuthGoogle