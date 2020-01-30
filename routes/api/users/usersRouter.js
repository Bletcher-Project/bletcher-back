const express = require("express");
const usersRouter = express.Router();
const controller = require("./usersController");
const signUpMiddleware = require("../../../middleware/signup");

usersRouter.get("/", controller.searchUser);
usersRouter.post("/", signUpMiddleware, controller.createUser);
usersRouter.delete("/", controller.deleteUser);

module.exports = usersRouter;
