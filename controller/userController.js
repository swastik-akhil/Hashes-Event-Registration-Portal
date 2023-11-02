const User = require("../model/userModel");
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy =require("passport-google-oauth20").Strategy;

const {usePassportForGoogleOAuth} = require("../utils/googleOAuth");
async function googleOAuth (req,res){
    
    usePassportForGoogleOAuth(req,res);    
}
    module.exports = {googleOAuth}
    // app.use(session({
    //     secret : process.env.SESSION_SECRET,
    //     resave : false,
    //     saveUninitialized : true,
    //     cookie : {secure : process.env.NODE_ENV === "PRODUCTION" ? true : false}
    // }))
    
    
    // app.use(passport.initialize());
    // app.use(passport.session());
    
//     const googleAuthOptions = {
//         clientID : process.env.GOOGLE_CLIENT_ID,
//         clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL : process.env.GOOGLE_AUTH_CALLBACK_URL === "PRODUCTION" ? process.env.GOOGLE_AUTH_CALLBACK_URL_PRODUCTION : process.env.GOOGLE_AUTH_CALLBACK_URL_DEVELOPMENT
//     }
    
//     passport.use(new GoogleStrategy(googleAuthOptions , async (accessToken,refreshToken,profile,done)=>{
        
//         //when user is successfully loggen in by google then google returns the profile of the user in profile variable and can be accesed by profile.displayName,profile.emails[0].value,profile.photos[0].value                                   
    
//         //add data to DB usign mongoDB
//         const user =  await User.create({
//             name : profile.displayName,
//             email : profile.emails[0].value,
//             // profile_photo_url : profile.photos[0].value
//          })
//          console.log(`user is ${user}` );
        
    
//         console.log(profile);
//         done(null,profile);
//     }))
    
//     passport.serializeUser((user,done)=>{
//         done(null,user);
//     });
    
//     passport.deserializeUser((obj, done)=>{
//         done(null, obj);
//     });


// function googleOAuthCallback(){

// }



// module.exports = {googleOAuth, googleOAuthCallback}