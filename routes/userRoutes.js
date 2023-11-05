const express = require("express");
const router = express.Router();
const {addDetails, createOrder, checkPayment} = require("../controllers/userController");
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const paymentStatus = require("../middlewares/paymentStatus");

router.get("/test", isLoggedIn, paymentStatus.notCompleted, (req, res)=>{
    res.render("test")
})
router.post("/addDetails", isLoggedIn, addDetails);
router.post("/createOrder", isLoggedIn, createOrder)
    // res.render("test")
// router.post("/paymentStatus", isLoggedIn, paymentStatus.completed, (req, res)=>{
//     res.status(200).json({msg: "Payment status is completed"});
// })
// router.get("/markPaymentComplete", markPaymentComplete)
router.post("/checkPayment", checkPayment)


module.exports = router;