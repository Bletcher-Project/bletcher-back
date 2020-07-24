import { Sequelize } from "sequelize";
import config from "../config";

export const sequelize = new Sequelize(
  config.database.dbname as string,
  config.database.username as string,
  config.database.password as string,
  {
    host: config.database.host,
    dialect: "mariadb",
    dialectOptions: { connectTimeout: 1000 },
    define: {
      timestamps: false,
    },
  }
);
