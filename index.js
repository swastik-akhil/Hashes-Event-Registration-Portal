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

const ipRequests = {};

// Custom rate limiting middleware
const customRateLimit = (req, res, next) => {
  const clientIp = req.ip;

  // Initialize IP tracking if not already present
  if (!ipRequests[clientIp]) {
    ipRequests[clientIp] = {
      count: 0,
      resetTime: Date.now() + 5 * 60 * 1000, // 5 minutes
    };
  }

  // Check if IP has exceeded limit
  if (ipRequests[clientIp].count >= 100 && Date.now() < ipRequests[clientIp].resetTime) {
    return res.status(429).send('Too many requests, please try again later.');
  }

  // Increment request count for the IP
  ipRequests[clientIp].count++;

  // Reset count after windowMs
  if (Date.now() >= ipRequests[clientIp].resetTime) {
    ipRequests[clientIp].count = 0;
    ipRequests[clientIp].resetTime = Date.now() + 5 * 60 * 1000; // 5 minutes
  }

  // Proceed to next middleware
  next();
};

// Function to log IP addresses and their request counts every 5 seconds
const logIPRequests = () => {
  setInterval(() => {
    console.log('--- Tracked IPs ---');
    Object.keys(ipRequests).forEach((ip) => {
      console.log(`${ip}: ${ipRequests[ip].count} requests`);
    });
    console.log('-------------------');
  }, 5000); // Every 5 seconds
};

// Start logging IP requests
logIPRequests();

// Apply custom rate limiting middleware globally to all routes
app.use(customRateLimit);


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


