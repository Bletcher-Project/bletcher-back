const express = require("express");
const authRouter = express.Router();
const controller = require("./authController");
const authMiddleware = require("../../../middleware/auth");
const uploadMiddleware = require("../../../middleware/upload");

//authRouter.use("/signup", uploadMiddleware);
authRouter.post("/signup", uploadMiddleware, controller.postSignUp);
authRouter.post("/signin", controller.postSignIn);

authRouter.use("/check", authMiddleware);
authRouter.get("/check", controller.check);

module.exports = authRouter;
