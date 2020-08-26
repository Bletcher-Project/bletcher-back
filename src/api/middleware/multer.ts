import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import calcUtil from '../../util/calc';

const cloudinary = require('cloudinary').v2;

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

const parser = (purpose: string) => multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: '/' + purpose,
      format: async (req, file) => calcUtil.getExtension(file.originalname),
      public_id: async () => {
        return new Date().valueOf() + calcUtil.getNand(10);
      },
    },
  }),
}); 

const multerProfile = parser('profile');
const multerPost = parser('post');

export const uploadProfile = multerProfile.single('img');
export const uploadPost = multerPost.single('img');
