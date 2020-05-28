const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* create folder for Profile IMG upload */
fs.readdir("uploads/profile", (error) => {
  if (error) {
    console.error("Create Upload folder");
    fs.mkdirSync("uploads/profile");
  }
});

/* create folder for Post IMG upload */
fs.readdir("uploads/post", (error) => {
  if (error) {
    console.error("Create Upload folder");
    fs.mkdirSync("uploads/post");
  }
});

const multerProfile = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/profile");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, new Date().valueOf() + ext);
    },
  }),
  // limits: { fileSize: 5 * 1024 * 1024 }
});

const multerPost = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/post");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, new Date().valueOf() + ext);
    },
  }),
  // limits: { fileSize: 5 * 1024 * 1024 }
});

const multerSketcherPost = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/post");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, new Date().valueOf() + ext);
    },
  }),
});

const uploadProfile = multerProfile.single("img");
const uploadPost = multerPost.single("img");
const uploadSketcherPost = multerSketcherPost.array("img", 2);

module.exports = { uploadProfile, uploadPost, uploadSketcherPost };
