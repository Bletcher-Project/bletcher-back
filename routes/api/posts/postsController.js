const {
  User,
  Post,
  Sequelize: { Op }
} = require("../../../models");

/*
  Get Post
  GET /api/posts => get all posts
  GET /api/posts/:userid => get post by user id
*/
exports.getPost = async (req, res, next) => {
  const userId = req.params.userid;
  try {
    if (userId) {
      await Post.findAll({
        where: { UserId: userId },
        include: { model: User, attributes: ["name", "profileImgName", "type"] },
        order: [["createdAt", "DESC"]]
      }).then(async allPosts => {
        return allPosts !== null
          ? res.status(200).json({ posts: allPosts })
          : res.status(404).json({ message: "Post not found" });
      });
    } else {
      await Post.findAll({
        include: { model: User, attributes: ["name", "profileImgName", "type"] },
        order: [["createdAt", "DESC"]]
      }).then(async allPosts => {
        return allPosts !== null
          ? res.status(200).json({ posts: allPosts })
          : res.status(404).json({ message: "Post not found" });
      });
    }
  } catch (error) {
    return next(error);
  }
};

/*
  Get Post by post id
  GET /api/posts/one/:postid
*/
exports.getPostByPostID = async (req, res, next) => {
  try {
    await Post.findOne({
      where: { id: req.params.postid },
      include: { model: User, attributes: ["name", "profileImgName", "type"] }
    }).then(async post => {
      return post !== null
        ? res.status(200).json({ post: post })
        : res.status(404).json({ message: "Post not found" });
    });
  } catch (error) {
    return next(error);
  }
};

/*
  Create Post
  POST /api/posts
*/
exports.postPost = async (req, res, next) => {
  const { content, UserId } = req.body;
  const imgpath = req.file ? req.file.filename : null;
  try {
    await Post.create({
      postImgName: imgpath,
      content: content,
      UserId: UserId
    })
      .then(async post => {
        return res.status(200).json({ createdPost: post });
      })
      .catch(() => {
        return res.status(400).json({ message: "Create post failed" });
      });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

/*
  PUT Post (Edit Post)
  PUT /api/posts/:id => edit post by post id
*/
exports.putPost = async (req, res, next) => {
  const id = req.params.id;
  const { content } = req.body;
  const imgpath = req.file ? req.file.path : null;

  try {
    Post.findOne({ where: { id: id } })
      .then(async post => {
        await post
          .update(
            { postImgName: imgpath, content: content },
            { where: { id: id } }
          )
          .then(async updatedPost => {
            return res.status(200).json({ updatedPost: updatedPost });
          });
      })
      .catch(() => {
        return res.status(404).json({ message: "Post not found" });
      });
  } catch (error) {
    return next(error);
  }
};

/*
  Delete Post
  Delete /api/posts/:id => delete post by post id
*/
exports.deletePost = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Post.findOne({ where: { id: id } }).then(async () => {
      await Post.destroy({ where: { id: id } }).then(async post => {
        return post === 1
          ? res.status(200).json({ message: "Post deleted" })
          : res.status(404).json({ message: "Post not found" });
      });
    });
  } catch (error) {
    return next(error);
  }
};
