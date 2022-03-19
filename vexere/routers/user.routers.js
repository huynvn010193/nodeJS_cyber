const express = require("express");
const { register, login } = require("../controllers/user.controllers");


const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);

// upload file
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./public/images/avatars"); // setup chỗ cần lưu file
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + "_" + file.originalname) // đặt lại tên cho file
  }
});
const upload = multer({ storage: storage });

userRouter.post("/upload-avatar", upload.single('avatar'), (req, res) => {
  res.send("Tính năng upload file run");
})

module.exports = {
  userRouter,
};
