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
      res.render("dashboard", { user: req.user });
    } else {
      res.redirect("/api/v1/auth/googleOAuth");
    }
  },

  logout: (req, res) => {
    req.logout((err) => console.log(err));
    res.redirect("/api/v1/login");
  },
};

module.exports = authController;
