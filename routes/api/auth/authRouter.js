const express = require("express");
const authRouter = express.Router();
const controller = require("../auth/authController");
const { isSignIn, isNotSignIn } = require("./middlewares");

authRouter.post("/signup", isNotSignIn, controller.postSignUp);
authRouter.post("/signin", isNotSignIn, controller.postSignIn);
authRouter.get("/signout", isSignIn, controller.getSignOut);

module.exports = authRouter;
