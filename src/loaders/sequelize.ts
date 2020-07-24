import { Model } from "sequelize";

export default async (): Promise<Model> => {
  const sequelize = require("../config/database").sequelize;
  const connection = await sequelize.sync({ force: true });
  return connection;
};
