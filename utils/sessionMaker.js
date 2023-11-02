// const session = require("express-session");
// const passport = require("passport");
// require("dotenv").config();
// const crypto = require("crypto");

// // function generateSecerateKey (){
// //     return crypto.randomBytes(32).toString("hex");
// // }
// // const key = Array.from({length : 3}, generateSecerateKey)

// const sessionMaker = session({
//     // secret: process.env.SESSION_SECRET,
//     secret: "xyz",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         // secure: process.env.NODE_ENV === "PRODUCTION" ? true : false,
//         secure: false,
//         // maxAge: 30 * 24 * 60 * 60 * 1000,           //TODO: add this to env
//         // httpOnly: true,
//         // sameSite: 'strict',
//         // secret : key,
//         // signed : true

//     },
// });
// console.log("session is created");

// // passport.initialize();
// // passport.session();  

// module.exports = { sessionMaker };

// session.js

const session = require('express-session');
const passport = require('passport');

function setupSessionMiddleware(app) {
    app.use(session({
        secret: 'your-secret-key', // Replace with your actual secret key
        resave: false,
        saveUninitialized: true,
    }));

    // Passport initialization
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = {setupSessionMiddleware};
