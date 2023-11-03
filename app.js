// app.js
const express = require("express");
const app = express();
require("dotenv").config();
const { dbConnect } = require("./config/dbConnect");
const passport = require("./config/passportConfig");
const sessionMiddleware = require("./middlewares/sessionMiddleware");
const staticMiddleware = require("./middlewares/staticMiddleware");
const bodyParserMiddleware = require("./middlewares/bodyParserMiddleware");
const authRoutes = require("./routes/authRoutes");

const path = require("path");
const staticPath = path.join(__dirname, "./views");
app.use(express.static(staticPath));
const ejs = require("ejs");
const { log } = require("console");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Connect to the database
dbConnect();

//using a logger
const logger = require("morgan");

// Set up middleware
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(staticMiddleware);
app.use(bodyParserMiddleware);
app.use(logger("dev"));

// Use authentication routes
app.use("/api/v1", authRoutes);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
