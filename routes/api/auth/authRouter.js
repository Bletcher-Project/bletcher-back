const express = require("express");
const authRouter = express.Router();
const controller = require("../auth/authController");

authRouter.post("/signup", controller.postSignUp);
authRouter.get("/signin", controller.);

export default authRouter;
