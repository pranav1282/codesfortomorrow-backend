const express = require("express");
const userRouter = express.Router();
const {
  signin,
  signup,
  forgotPassword,
} = require("../controllers/userController");

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.post("/forgotPassword", forgotPassword);

module.exports = userRouter;
