const express = require("express");
const usersRouter = express.Router();
const controller = require("./usersController");
const multerMiddleware = require("../../../middleware/multer");

usersRouter.get("/", controller.getUser);
usersRouter.post("/", multerMiddleware, controller.postUser);
usersRouter.delete("/", controller.deleteUser);

module.exports = usersRouter;
