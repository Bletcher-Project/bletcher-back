const express = require("express");
const postsRouter = express.Router();
const controller = require("./postsController");
const multerMiddleware = require("../../../middleware/multer");

postsRouter.get("/", controller.getPost);
postsRouter.get("/:id", controller.getPost);
postsRouter.post("/", multerMiddleware, controller.postPost);
postsRouter.put("/:id", multerMiddleware, controller.putPost);
postsRouter.delete("/:id", controller.deletePost);

module.exports = postsRouter;
