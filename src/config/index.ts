import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) throw new Error("Couldn't find .env file");

const cloudinary = require('cloudinary').v2;

export default {
  port: parseInt(process.env.PORT as string, 10),
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
  cloudinary: () => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  },
  reqAddress: process.env.REQ_ADDRESS,
  database: {
    dbname: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
  },
  jwtKey: process.env.JWT_KEY,
  api: {
    prefix: '/api',
  },
};
