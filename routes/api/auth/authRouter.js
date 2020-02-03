const express = require("express");
const authRouter = express.Router();
const controller = require("./authController");
const authMiddleware = require("../../../middleware/auth");
const multerMiddleware = require("../../../middleware/multer");

authRouter.post("/signup", multerMiddleware, controller.postSignUp);
authRouter.post("/signin", controller.postSignIn);

authRouter.use("/check", authMiddleware);
authRouter.get("/check", controller.check);

module.exports = authRouter;
