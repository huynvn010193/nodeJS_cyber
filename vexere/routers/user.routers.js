const express = require("express");
const { register, login, uploadAvartar } = require("../controllers/user.controllers");
const { authenticate } = require("../middlewares/auth/authenticate");
const { uploadImage } = require("../middlewares/upload/upload-image");


const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);


userRouter.post("/upload-avatar", authenticate, uploadImage('user'), uploadAvartar);

module.exports = {
  userRouter,
};
