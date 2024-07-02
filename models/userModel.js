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
    lowercase: true, 
  },
  profile_photo_url: {
    type: String,
    required: true,
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
  },
  // rollNumber: {
  //   type: Number,
  //   required: true,
  //   unique: true, 
  // },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  paymentId: {
    type: String,
  }

});

const User = mongoose.model('User', userSchema);


module.exports = User;
