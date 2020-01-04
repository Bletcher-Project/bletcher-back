const express = require("express");
const authRouter = express.Router();
const controller = require("./authController");

authRouter.post("/signup", controller.postSignUp);

module.exports = authRouter;
