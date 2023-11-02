const express = require('express');
const passport = require("passport");
const router = express.Router();
// const {googleOAuth, googleOAuthCallback} = require('../controller/userController');   
const {googleOAuth} = require('../controller/userController');   

router.route('/auth/googleOAuth')
    .get(googleOAuth, passport.authenticate("google", {scope : ["profile","email"]}));

router.route("/auth/googleOAuth/callback")
    .post(passport.authenticate("google", {failureRedirect : "/api/v1/login"}), async (req,res)=>{
        // res.redirect("/api/v1/user/dashboard")})
        res.render("dashboard")})

router.route("/dashboard")
    .get((req,res)=>{
        // console.log(req);
        log(req.user);
        if(req.isAuthenticated()){
            res.render("dashboard", {user : req.user});    
        }
        else{
            res.redirect("/api/v1/user/auth/googleOAuth");
        }
    })


module.exports = router;
    