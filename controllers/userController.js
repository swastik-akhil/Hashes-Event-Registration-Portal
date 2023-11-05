const User = require('../models/userModel');

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

        console.log(`razorpayInstance: ${razorpayInstance}`);
        const options = {
            amount: 500 * 100,
            currency: "INR",
            partial_payment: false,
            payment_capture: 1
        };

        const order = await razorpayInstance.orders.create(options);
        // req.user.paymentStatus = true;
        // await req.user.save();
        return res.status(200).json({ success:true,
            msg:'Order Created',
            order_id:order.id,
            // amount:amount,
            key_id:RAZORPAY_KEY_ID,
            // contact:"8077123987" || req.body.number,           //random number
            name: req.user.name,       
            email: req.user.email,                  
            createdAt : Date.now() });   



     } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
};


async function markPaymentComplete(req, res) {
    const user = await User.findOne({email: req.user.email});
    user.paymentStatus = true;
    await user.save();
    return res.status(200).json({msg: "Payment status marked completed"});
}

module.exports = { addDetails, createOrder, markPaymentComplete };

