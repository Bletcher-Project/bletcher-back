require("dotenv").config();
const env = process.env;

const development = {
  username: "root",
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  operatorsAliases: "false"
};

const production = {
  username: "root",
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  operatorsAliases: "false",
  logging: "false"
};

const test = {
  username: "root",
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  operatorsAliases: "false"
};

module.exports = { development, production, test };
