import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) throw new Error("Couldn't find .env file");

export default {
  port: parseInt(process.env.PORT, 10),
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  reqAddress: process.env.REQ_ADDRESS,
  database: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    dialect: "mysql",
    operatorsAliases: "false",
    logging: "false",
  },
  jwtKey: process.env.JWT_KEY,
  api: {
    prefix: "/api",
  },
};
