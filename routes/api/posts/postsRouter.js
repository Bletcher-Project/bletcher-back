const express = require("express");
const postsRouter = express.Router();
const controller = require("./postsController");
const multerMiddleware = require("../../../middleware/multer");
const colabMiddleware = require("../../../middleware/colab");

postsRouter.get("/", controller.getPost);
postsRouter.get("/:userid", controller.getPost);
postsRouter.get("/one/:postid", controller.getPostByPostID);

postsRouter.post("/", multerMiddleware.uploadPost, controller.postPost);
postsRouter.post(
  "/sketcher",
  multerMiddleware.uploadSketcherPost,
  colabMiddleware.uploadColab,
  controller.postSketcherPost
);
postsRouter.put("/:id", multerMiddleware.uploadPost, controller.putPost);
postsRouter.delete("/:id", controller.deletePost);

postsRouter.post("/like/:postid", controller.postPostLike);
postsRouter.delete("/like/:postid", controller.deletePostLike);

module.exports = postsRouter;
