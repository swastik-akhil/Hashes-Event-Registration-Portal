// routes/authRoutes.js
const express = require("express");
const passport = require("../config/passportConfig");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.login);
router.get("/auth/googleOAuth", authController.googleOAuth);
router.get(
  "/auth/googleOAuth/callback",
  authController.googleOAuthCallback,
  (req, res) => {
    res.redirect("/dashboard");
  }
);
router.get("/dashboard", authController.dashboard);
router.get("/logout", authController.logout);

module.exports = router;
