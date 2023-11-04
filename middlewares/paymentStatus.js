const User = require('../models/userModel');
const passport = require("../config/passportConfig");

const paymentStatus = {
    completed : (req, res, next)=>{
        const user = User.findOne({email: req.user.email})
        if(user.paymentStatus === true){
            next();
        }
    },

    notCompleted: (req, res, next)=>{
        const user = User.findOne({email: req.user.email})
        if(user.paymentStatus === false){
            next();
        }
    }
}

module.exports = paymentStatus;