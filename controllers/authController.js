// controllers/authController.js
const passport = require("../config/passportConfig");
const User = require("../models/userModel");

const authController = {
  login: (req, res) => {
    res.render("login");
  },

  googleOAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleOAuthCallback: passport.authenticate("google", {
    failureRedirect: "/api/v1",
  }),

  dashboard: (req, res) => {
    if (req.isAuthenticated()) {
      console.log("user is authenticated");
      console.log("req.user:", req.user); 
      // if (req.user) {
      //   console.log("User properties:");
      //   console.log("displayName:", req.user.displayName);
      //   console.log("emails:", req.user.emails);
      //   console.log("photos:", req.user.photos);
      // } else {
      //   console.log("req.user is undefined");
      // }
      
      res.render("dashboard", { user: req.user });
    }
  },

  logout: (req, res) => {
    req.logout((err) => console.log(err));
    res.redirect("/api/v1/login");
  },
};

module.exports = authController;
