const express = require("express");
const router = express.Router();

const auth = require("./auth/authRouter");

router.use("/auth", auth);

module.exports = router;
