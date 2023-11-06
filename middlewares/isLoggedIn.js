const passport = require("../config/passportConfig");
function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        console.log(`inside isLoggedIn middleware ${req.user}`);
        console.log("user is authenticated");
        next();
    }
    else {
    console.log("req.user is undefined");
    res.redirect("/");
    }
};

module.exports = {isLoggedIn};