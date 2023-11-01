const express = require("express");
const app = express();
require(dotenv).config();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy =require("passport-google-oauth20").Strategy;


const ejs = require("ejs");
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const userRouter = require("./router/userRouter");

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {secure : process.env.NODE_ENV === "PRODUCTION" ? true : false}
}))


app.use(passport.initialize());
app.use(passport.session());

const googleAuthOptions = {
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : process.env.GOOGLE_AUTH_CALLBACK_URL === "PRODUCTION" ? GOOGLE_AUTH_CALLBACK_URL_PRODUCTION : GOOGLE_AUTH_CALLBACK_URL_DEVELOPMENT
}

passport.use(new GoogleStrategy(googleAuthOptions ,(accessToken,refreshToken,profile,done)=>{
    
    //when user is successfully loggen in by google then google returns the profile of the user in profile variable and can be accesed by profile.displayName,profile.emails[0].value,profile.photos[0].value                                   

    //add data to DB usign mongoDB
    

    console.log(profile);
    done(null,profile);
}))

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((obj, done)=>{
    done(null, obj);
});

app.use("/", userRouter);





app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
        