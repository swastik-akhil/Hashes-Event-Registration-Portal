const passport = require("../config/passportConfig");
function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
        console.log("user is authenticated");
        next();
    }
    else {
    console.log("req.user is undefined");
    res.redirect("/api/v1/login");
    }
};

module.exports = {isLoggedIn};