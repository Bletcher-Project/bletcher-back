const express = require("express");
const postsRouter = express.Router();
const controller = require("./postsController");
const multerMiddleware = require("../../../middleware/multer");

postsRouter.get("/", controller.getPost);
postsRouter.get("/:userid", controller.getPost);
postsRouter.get("/one/:postid", controller.getPostByPostID);

postsRouter.post("/", multerMiddleware.uploadPost, controller.postPost);
postsRouter.put("/:id", multerMiddleware.uploadPost, controller.putPost);
postsRouter.delete("/:id", controller.deletePost);

postsRouter.post("/like/:postid", controller.postPostLike);

module.exports = postsRouter;
