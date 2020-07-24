const {
  User,
  Post,
  Comment
} = require("../../../models");

/*
  Get Comments by post id
  GET /api/comments/:postid
*/
exports.getCommentsByPostId = async (req, res, next) => {
  const postId = req.params.postid;
  const tokenUserId = req.decoded._id;
  try {
    await Comment.findAll({
      where: { PostId: postId },
      order: [["createdAt", "DESC"]]
    }).then(comments => {
      return comments !== null
        ? res.status(200).json({ comments: comments })
        : res.status(404).json({ message: "Comments not found" });
    });
  } catch (error) {
    return next(error);
  }
};


/*
  Post Comments
  POST /api/comments
*/
exports.postComment = async (req, res, next) => {
  const tokenUserId = req.decoded._id;
  const { postId, content } = req.body;

  try {
    await Comment.create({
      content: content,
      UserId: tokenUserId,
      PostId: postId
    })
      .then(comment => {
        return res.status(200).json({ createdComment: comment });
      })
      .catch(err => {
        return res.status(400).json({ message: "Create comment failed" });
      });
  } catch (error) {
    return next(error);
  }
};