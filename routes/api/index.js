const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middleware/auth");

const auth = require("./auth/authRouter");
const users = require("./users/usersRouter");
const posts = require("./posts/postsRouter");

router.use("/auth", auth);
router.use("/users", users);

router.use("/posts", authMiddleware);
router.use("/posts", posts);


module.exports = router;
