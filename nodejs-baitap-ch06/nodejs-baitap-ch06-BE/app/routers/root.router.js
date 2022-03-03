const express = require('express');
const productRoter = require('./product.router');
const router = express.Router();

router.use("/products",productRoter);

module.exports = router;
