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


const helmet = require("helmet");
app.use(helmet());

app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.json({ limit: "1kb" }));

const rateLimit = require('express-rate-limit');
const ipKeyGenerator = (req) => {
  return req.ip; // Using IP address as the key
};

// Rate limiting middleware setup
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,  // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  keyGenerator: ipKeyGenerator, // Generate key based on IP address
});

// Applying limiter middleware globally to all routes
app.use(limiter);

// Define your routes
app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use(limiter);


async function onRateLimit(req, res, options) {
  res.status(429).send("Too many requests, please try again later.");
}


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


