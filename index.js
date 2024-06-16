const express = require("express");
const app = express();
require("dotenv").config();
require("./config/dbConnect").dbConnect();
const passport = require("./config/passportConfig");
const authRoutes = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes")

const expressSession = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const dbString = process.env.MONGODB_URL;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const sessionStore = MongoStore.create({
  clientPromise: mongoose.connect(dbString, dbOptions).then(m => m.connection.getClient()),
  collectionName: "session"
});

app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { secure: process.env.NODE_ENV === "production" ? true : false },
}));

const path = require("path");
const staticPath = path.join(__dirname, "./views");
app.use(express.static(staticPath));
require("ejs");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Set up middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use authentication routes under "/api/v1" prefix
app.use("/", authRoutes);
app.use("/user", userRouter)

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


