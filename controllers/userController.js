const User = require('../models/userModel');

async function addDetails(req,res)  {
    
    // const {email} = req.user;
    // const existingUser = User.findOne({email});
    // if(existingUser){
    //     res.status(400).json({msg: "User already exists"});
    // }
    const {branch, year, studentNumber} = req.body;
    
    if(!branch || !year || !studentNumber){
        return res.status(400).json({msg: "Please enter all fields"});
    }
    
    if(typeof studentNumber !== 'number'){
        return res.status(400).json({msg: "Please enter a valid student number"});
    }

    let rollNumber;

    if(req.body.rollNUmber){
        if(typeof rollNumber !== 'number'){
            return res.status(400).json({msg: "Please enter a valid roll number"});
        }
        rollNumber = req.body;

        try{
            
            const existingUser = await User.find({studentNumber, rollNumber});
            
            if(existingUser){
                return res.status(400).json({msg: "Student number already exists"});
            }

            const user = await User.create({
                branch,
                year,
                studentNumber,
                rollNumber
            })
        }catch(err){
            return res.status(400).json({msg: "Roll number already exists"});
        }

        return res.status(200).json({msg: "Details added successfully", user});
    }

    try{
        const existingUser = await User.find({studentNumber});
        
        if(existingUser){
            const user = User.create({
                branch,
                year,
                studentNumber
            })
            return res.status(400).json({msg: "Student number already exists"});
        }
    }catch(e){
        return res.status(400).json({msg: "Student number already exists"});
    }

}


// function makePayment(){

// }

module.exports = {addDetails};