const passport = require("../config/passportConfig");
// const User = require("../models/userModel");

const authController = {
  login: (req, res) => {
    res.render("login");
  },

  googleOAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleOAuthCallback: passport.authenticate("google", {
    failureRedirect: "/",
  }),

  dashboard: (req, res) => {
    if (req.isAuthenticated()) {
      res.render("dashboard", { user: req.user });
    }
  },

  
  logout: (req, res) => {
    req.logout((err) => console.log(err));
    res.redirect("/");
  },
};

module.exports = authController;