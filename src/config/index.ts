import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV !== 'production') {
  const envFound = dotenv.config();
  if (envFound.error) throw new Error("Couldn't find .env file");
}

export default {
  port: parseInt(process.env.PORT as string, 10),
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
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
