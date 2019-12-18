var express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
var router = express.Router();
const { User } = require("../models");

/* code for uploading profile img */
fs.readdir("uploads", error => {
  if (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync("uploads");
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

/* POST Signup */
router.post("/", upload.single("img"), async (req, res, next) => {
  //console.log(req.file);
  //res.json({ url: `${req.file.path}` });
  const { email, name, password, profileImgName, status, type } = req.body;
  const imgpath = req.file ? req.file.path : null;
  try {
    const exUser = await User.findOne({
      where: {
        email
      }
    });
    if (exUser) {
      return res.status(400).send("Already exists email");
    }

    await User.create({
      email,
      name,
      password,
      profileImgName: imgpath,
      status,
      type
    });

    return res.status(200).send("Signup Success!");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;