import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import User from '../models/user';
import Account from '../models/account';
import Address from '../models/address';

export default async (): Promise<Sequelize> => {
  const db = { sequelize, Sequelize, User, Account, Address };
  const connection = await db.sequelize.sync({ force: true });
  return connection;
};
