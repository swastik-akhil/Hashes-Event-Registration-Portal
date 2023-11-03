// middlewares/staticMiddleware.js
const express = require("express");
const path = require("path");

const staticPath = path.join(__dirname, "./views");

const staticMiddleware = express.static(staticPath);

module.exports = staticMiddleware;
