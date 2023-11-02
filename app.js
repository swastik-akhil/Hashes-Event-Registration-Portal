const express = require("express");
const app = express();
require("dotenv").config();
require("./config/dbConnect").dbConnect();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy =require("passport-google-oauth20").Strategy;

const path = require("path");
const staticPath = path.join(__dirname, "./views");
app.use(express.static(staticPath));
const ejs = require("ejs");
const { log } = require("console");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));


app.use(express.json());
app.use(express.urlencoded({extended : true}));

const User = require("./model/userModel");


// const userRouter = require("./router/userRouter");

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
    callbackURL : process.env.GOOGLE_AUTH_CALLBACK_URL === "PRODUCTION" ? process.env.GOOGLE_AUTH_CALLBACK_URL_PRODUCTION : process.env.GOOGLE_AUTH_CALLBACK_URL_DEVELOPMENT
}

passport.use(new GoogleStrategy(googleAuthOptions , async (accessToken,refreshToken,profile,done)=>{
    
    //when user is successfully loggen in by google then google returns the profile of the user in profile variable and can be accesed by profile.displayName,profile.emails[0].value,profile.photos[0].value                                   

    //add data to DB usign mongoDB
    const user =  await User.create({
        name : profile.displayName,
        email : profile.emails[0].value,
        // profile_photo_url : profile.photos[0].value
     })
     console.log(`user is ${user}` );
    

    console.log(profile);
    done(null,profile);
}))

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((obj, done)=>{
    done(null, obj);
});

// app.use("/", userRouter);

app.get("/api/v1/login", (req,res)=>{
    res.render("login");
})

app.get("/api/v1/auth/googleOAuth", passport.authenticate("google", {scope : ["profile","email"]}));





app.get("/api/v1/auth/googleOAuth/callback", passport.authenticate("google", {failureRedirect : "/api/v1"}), async (req,res)=>{
    // console.log(res);
    res.redirect("/api/v1/dashboard");
})

app.get("/api/v1/dashboard", (req,res)=>{
    // console.log(req);
    log(req.user);
    if(req.isAuthenticated()){
        res.render("dashboard", {user : req.user});    
    }
    else{
        res.redirect("/api/v1/auth/googleOAuth");
    }


})

app.get("/api/v1/logout", (req,res)=>{
    req.logout( (err) => console.log(err) );
    res.redirect("/api/v1/login");

})



























app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
        