const express = require("express");

// Khởi tạo Fingerprint router
const fingerPrintRouter = express.Router();

fingerPrintRouter.get("/", (req, res) => {
  res.send(req.fingerprint);
});

module.exports = {
  fingerPrintRouter,
};
