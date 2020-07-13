const express = require("express");
const postsRouter = express.Router();
const controller = require("./commentsController");

postsRouter.get("/:postid", controller.getCommentsByPostId);

postsRouter.post("/", controller.postComment);

module.exports = postsRouter;
