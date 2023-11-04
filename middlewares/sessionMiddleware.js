const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo").default;
const sessionStore = new MongoStore({
  client: dbConnection.getClient(),
  collectionName: 'sessions'
})
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { secure: process.env.NODE_ENV === "production" ? true : false },
});

module.exports = sessionMiddleware;
