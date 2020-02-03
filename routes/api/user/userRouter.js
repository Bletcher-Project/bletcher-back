const express = require("express");
const userRouter = express.Router();
const controller = require("./userController");

userRouter.get("/", controller.getUser);
userRouter.delete("/", controller.deleteUser);

module.exports = userRouter;
