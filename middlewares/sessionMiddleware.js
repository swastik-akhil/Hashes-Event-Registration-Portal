// middlewares/sessionMiddleware.js
const session = require("express-session");

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === "PRODUCTION" ? true : false }
});

module.exports = sessionMiddleware;
