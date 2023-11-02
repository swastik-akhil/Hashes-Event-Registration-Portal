const express = require("express");
const app = express();
require("dotenv").config();
require("./config/dbConnect").dbConnect();
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy =require("passport-google-oauth20").Strategy;

const path = require("path");
const ejs = require("ejs");
const staticPath = path.join(__dirname, "./views");
app.use(express.static(staticPath));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true}));
// Use the session setup middleware
const {setupSessionMiddleware} = require('./utils/sessionMaker'); // Adjust the path accordingly
setupSessionMiddleware(app);
// app.use(session({
// secret : "process.env.SESSION_SECRET",
//     resave : false,
//     saveUninitialized : true,
//     cookie : {secure : process.env.NODE_ENV === "PRODUCTION" ? true : false}
// }))
// app.use(passport.initialize());
// app.use(passport.session());



// const User = require("./model/userModel");

//importing Routers
const staticRouter = require("./router/staticRouter");
const userRouter = require("./router/userRouter");


//using routers
app.use("/", staticRouter);
app.use("/api/v1/user", userRouter);


// app.get("/api/v1/auth/googleOAuth", passport.authenticate("google", {scope : ["profile","email"]}));


// app.get("/api/v1/auth/googleOAuth/callback", passport.authenticate("google", {failureRedirect : "/api/v1"}), async (req,res)=>{
//     // console.log(res);
//     res.redirect("/api/v1/dashboard");
// })

// app.get("/api/v1/dashboard", (req,res)=>{
//     // console.log(req);
//     log(req.user);
//     if(req.isAuthenticated()){
//         res.render("dashboard", {user : req.user});    
//     }
//     else{
//         res.redirect("/api/v1/auth/googleOAuth");
//     }


// })

// app.get("/api/v1/logout", (req,res)=>{
//     req.logout( (err) => console.log(err) );
//     res.redirect("/api/v1/login");

// })
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
        