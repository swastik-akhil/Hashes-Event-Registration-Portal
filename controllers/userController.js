const User = require('../models/userModel');
const {sendMail} = require("../utils/emailHelper")

async function addDetails(req,res)  {

    const user = await User.findOne({email: req.user.email});
    if(user.paymentStatus){
        return res.render("dashboard", {user})
    }
    
    const {branch, year, studentNumber} = req.body;

    // if(studentNumber.length !== 8){
    //     return res.status(400).json({msg: "Invalid student number, must have 8 digits"});
    // }
    
    if(!branch || !year || !studentNumber){
        return res.status(400).json({msg: "Please enter all fields"});
    }
    

    if(req.body.rollNumber){
        
        const {rollNumber} = req.body;

        // if(rollNumber.length !== 13){
        //     return res.status(400).json({msg: "Invalid roll number, must have 13 digits"});
        // }
        try{
            
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
        console.log(`The order is created`)
        return res.status(200).json({ success:true,
            msg:'Order Created',
            order_id:order.id,
            // amount:amount,
            key_id:RAZORPAY_KEY_ID,
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
    // if (expectedSignature === req.body.signature){
    //     response = { status: "success" };
    //     console.log("payment successfull")
    //     console.log(`The user before saving is ${req.user}`)
    //     const user = req.user;
    //     user.paymentStatus = true;
    //     await user.save();
    //     sendMail(user.email, req.body.order_id);
    //     // return res.status(200).json("Email sent successfully");
    //     // return res.render("test")
    //     // return res.status(200).redirect("/api/v1/dashboard");
    //     return res.status(200).render("dashboard");
    // }
    // else{
    //     response = { status: "failure" };
    //     console.log("payment failed")
    //     // res.redirect("/api/v1/us");
    // }

    if (expectedSignature === req.body.signature) {
        const user = req.user;
        user.paymentStatus = true;
        user.save().then(() => {
            console.log("Payment successful");
            console.log(`The user before saving is ${req.user}`);
            sendMail(user.email, req.body.order_id);
            // Redirect to the "dashboard" page using a GET request
            return res.status(200).redirect("/dashboard");
        }).catch((error) => {
            console.error("Error saving user:", error);
            return res.status(500).json({ status: "failure", error: "Error saving user" });
        });
    } else {
        response = { status: "failure" };
        console.log("Payment failed");
        // Handle payment failure, e.g., redirect or send an error response
        return res.status(400).json({ status: "failure", error: "Payment failed" });
    }
    
    


}

module.exports = { addDetails, createOrder, checkPayment };