const User = require('../models/userModel');
// const emailHelper = require("../utils/emailHelper")
const {sendMail} = require("../utils/emailHelper")

async function addDetails(req,res)  {

    const user = await User.findOne({email: req.user.email});
    if(user.paymentStatus){
        return res.render("dashboard", {user})
    }
    
    const {branch, year, studentNumber} = req.body;
    
    if(!branch || !year || !studentNumber){
        return res.status(400).json({msg: "Please enter all fields"});
    }
    
    // if (typeof studentNumber !== 'number' || isNaN(studentNumber)) {
    //     return res.status(400).json({ msg: "Please enter a valid student number" });
    //   }
      
    // let rollNumber;

    if(req.body.rollNumber){
        // if(typeof rollNumber !== 'number' || isNaN(rollNumber)){
        //     return res.status(400).json({msg: "Please enter a valid roll number"});
        // }
        const {rollNumber} = req.body;

        try{
            
            // const existingUser = await User.find({studentNumber, rollNumber});
            
            // if(existingUser){
            //     return res.status(400).json({msg: "Student number already exists"});
            //     // return res.render("dashboard", {user})
            // }

            user.branch = branch;
            user.year = year;
            user.studentNumber = studentNumber;
            user.rollNumber = rollNumber;
            await user.save();

            return res.status(200).render("makePayment", {user})
            // return res.render("test")
        }catch(err){
            return res.status(400).json({msg: "error while creating user (with rollNumber)"}, err);
        }
        
    }

    try{
        // const existingUser = await User.find({studentNumber});
        // if(existingUser){
        //     // return res.render("dashboard", {user})
        //     return res.status(400).json({msg: "Student number already exists"});
        // }

        user.branch = branch;
        user.year = year;
        user.studentNumber = studentNumber;
        await user.save();

        return res.status(400).render("makePayment", {user});
        // return res.render("test")
    }catch(e){
        return res.status(400).json({msg: "error while creating user (without rollNumber)"}, e);
    }

}



const createOrder = async (req, res) => {
    try {
        console.log(`inside createOrder`);
        const Razorpay = require('razorpay');
        require("dotenv").config();
        const { RAZORPAY_KEY_ID, RAZORPAY_SECRET_KEY } = process.env;


        const razorpayInstance = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_SECRET_KEY
        });

        const options = {
            amount: 500 * 100,
            currency: "INR",
            partial_payment: false,
            payment_capture: 1
        };

        const order = await razorpayInstance.orders.create(options);
        // req.user.paymentStatus = true;
        // await req.user.save();
        console.log(`The order is created`)
        return res.status(200).json({ success:true,
            msg:'Order Created',
            order_id:order.id,
            // amount:amount,
            key_id:RAZORPAY_KEY_ID,
            // contact:"8077123987" || req.body.number,           //random number
            name: req.user.name,       
            email: req.user.email,                  
            createdAt : Date.now(),
            order: order
        
        });   



     } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
};


// async function markPaymentComplete(req, res) {
//     const user = await User.findOne({email: req.user.email});
//     user.paymentStatus = true;
//     await user.save();
//     return res.status(200).json({msg: "Payment status marked completed"});
// }


async function checkPayment(req, res) {
    console.log("inside checkPayment")
    console.log(req.body)
    console.log(`req.body.order_id is ${req.body.order_id}`)
    console.log(`req.body.payment_id is ${req.body.payment_id}`)
    body = req.body.order_id + "|" + req.body.payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    console.log("sig" + req.body.signature);
    console.log("sig" + expectedSignature);
    // var response = { status: "failure" };
    if (expectedSignature === req.body.signature){
        response = { status: "success" };
        console.log("payment successfull")
        console.log(`The user before saving is ${req.user}`)
        const user = req.user;
        user.paymentStatus = true;
        await user.save();
        // const message = `Your registration has been done successfully`;     //TODO: add email in message
        // const options = {
        //     email : user.email,
        //     subject : "Registration successful",
        //     message
        // }
        // try{
        //     await emailHelper(options)
        //     return res.status(200).json({status : "success", message : "Email sent successfully"});
        // }catch(e){
        //     console.log(e);
        //     return res.status(400).json({status : "failed", message : "Something went wrong while sending email"});
        // }
        await sendMail(user.email);
        return res.status(200).json("Email sent successfully");
        // return res.status(200).redirect("/api/v1/dashboard");
        // return call(req,res, user);
    }
    else{
        response = { status: "failure" };
        console.log("payment failed")
    }

// function call (req,res, user){
//     res.render("dashboard", {user});
// }




}

module.exports = { addDetails, createOrder, checkPayment };

