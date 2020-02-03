const express = require("express");
const router = express.Router();

const auth = require("./auth/authRouter");
const user = require("./user/userRouter");

router.use("/auth", auth);
router.use("/user", user);

module.exports = router;
