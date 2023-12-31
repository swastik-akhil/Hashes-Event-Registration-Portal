const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    // unique: true, 
    lowercase: true, 
  },
  profile_photo_url: {
    type: String,
    required: true,
    // validate: {
    //   validator: (url) => {
    //     const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    //     return urlRegex.test(url);
    //   },
    //   message: 'Invalid URL format for profile photo.',
    // },
  },
  branch: {
    type: String,
    // required: true,
    enum: ['CSE', 'ECE', 'ME', 'CE', 'EN', 'CSE(DS)', 'CSE(AIML)', 'IT', 'CSIT'], // Limit to specific options
  },
  year: {
    type: String,
    // required: true,
    enum: ['First', 'Second', 'Third', 'Fourth'], // Limit to specific options
  },
  studentNumber: {
    type: Number,
    // required: true,
    unique: true, 
  },
  rollNumber: {
    type: Number,
    // required: true,
    unique: true, 
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  // razorpayOrderId: {
  //   type: String,
  // }

});

const User = mongoose.model('User', userSchema);


module.exports = User;
