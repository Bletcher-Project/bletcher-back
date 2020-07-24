import { Sequelize, Model } from "sequelize";
import User from "../models/user";
import Account from "../models/account";
import Address from "../models/address";

export default async (): Promise<Model> => {
  const sequelize = require("../config/database").sequelize;
  const db = { sequelize, Sequelize, User, Account, Address };
  const connection = await db.sequelize.sync({ force: true });
  return connection;
};
