const express = require("express");
const router = express.Router();
const {addDetails} = require("../controllers/userController");
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const paymentStatus = require("../middlewares/paymentStatus");


router.post("/addDetails", isLoggedIn, paymentStatus.notCompleted, addDetails);


module.exports = router;