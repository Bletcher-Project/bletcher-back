const express = require("express");
const authRouter = express.Router();
const controller = require("./authController");

authRouter.post("/signup", controller.postSignUp);
authRouter.post("/signin", controller.postSignIn);

module.exports = authRouter;
