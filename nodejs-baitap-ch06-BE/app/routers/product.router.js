const express = require('express');
const { getProductlist, getProductDetailById, createProductNew, updateProductById, deleteProductById } = require('../controllers/product.controllers');
const { logFeature } = require('../middlewares/logger/log-feature');
const { checkEmpty, checkNumberPriceOrAmount } = require('../middlewares/validations/product.validation');
const productRouter = express.Router();

productRouter.get("/", logFeature, getProductlist);

productRouter.get("/:id", getProductDetailById);

productRouter.post("/", checkEmpty, checkNumberPriceOrAmount ,createProductNew);

productRouter.put("/:id", updateProductById);

productRouter.delete("/:id", deleteProductById);

module.exports = productRouter;