const express = require('express');
const router = express.Router();

router.route('/')
    .post(/api/v1/googleOAuth)
    