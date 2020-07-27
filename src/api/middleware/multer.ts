import multer from 'multer';
import path from 'path';
import fs from 'fs';

/* create folder for Profile IMG upload */
fs.readdir('uploads/profile', (error) => {
  if (error) {
    fs.mkdirSync('uploads/profile');
  }
});

/* create folder for Post IMG upload */
fs.readdir('uploads/post', (error) => {
  if (error) {
    fs.mkdirSync('uploads/post');
  }
});

const multerProfile = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/profile');
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
      cb(null, 'uploads/post');
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
      cb(null, 'uploads/post');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, new Date().valueOf() + ext);
    },
  }),
});

export const uploadProfile = multerProfile.single('img');
export const uploadPost = multerPost.single('img');
export const uploadSketcherPost = multerSketcherPost.array('img', 2);
