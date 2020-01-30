const express = require("express");
const router = express.Router();

const auth = require("./auth/authRouter");
const users = require("./users/usersRouter");

router.use("/auth", auth);
router.use("/users", users);

module.exports = router;
