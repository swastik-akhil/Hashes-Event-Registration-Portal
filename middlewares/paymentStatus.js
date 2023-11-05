const User = require('../models/userModel');
const passport = require("../config/passportConfig");

const paymentStatus = {
    completed : (req, res, next)=>{
        if(req.user.paymentStatus === true){
            next();
        }else{
            res.status(400).json({
                sender : "paymentMiddleware",
                msg: "Payment status is not completed"});
        }
    },

    notCompleted: (req, res, next)=>{
        // console.log(user)
        console.log(`inside payment middleware ${req.user}`)
        if(req.user.paymentStatus === false){
            next();
        }else{
            res.status(400).json({
                sender : "paymentMiddleware",
                msg: "Payment status is completed"});
        }
    }
}

module.exports = paymentStatus;