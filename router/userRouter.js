const express = require('express');
const router = express.Router();
const googleOAuth = require('../controller/userController');   
router.route('/')
    .post(/api/v1/auth/googleOAuth)



module.exports = router;
    