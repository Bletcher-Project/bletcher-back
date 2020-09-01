import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import calcUtil from '../../util/calc';

const cloudinary = require('cloudinary').v2;

const parser = (purpose: string) => multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `/${purpose}`,
      format: async (req, file) => calcUtil.getExtension(file.originalname),
      public_id: async () => new Date().valueOf() + calcUtil.getNand(10),
    },
  }),
});

export const uploadProfile = parser('profile').single('img');
export const uploadPost = parser('post').single('img');
