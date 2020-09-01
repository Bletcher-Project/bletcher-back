import config from '../config';

const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = async () => {
  await cloudinary.config({
    cloud_name: config.cloudinaryApi.cloud_name,
    api_key: config.cloudinaryApi.api_key,
    api_secret: config.cloudinaryApi.api_secret,
  });
};

export default (): Promise<void> => cloudinaryConfig();
