import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import User from '../models/user';
import Account from '../models/account';
import Address from '../models/address';
import Category from '../models/category';
import Favorite from '../models/favorite';
import Funding from '../models/funding';
import Image from '../models/image';
import Mix from '../models/mix';
import Notice from '../models/notice';
import Order from '../models/order';
import Post from '../models/post';
import Shopitem from '../models/shopitem';

export default async (): Promise<Sequelize> => {
  const db = {
    sequelize,
    Sequelize,
    User,
    Account,
    Address,
    Post,
    Image,
    Category,
    Shopitem,
    Favorite,
    Funding,
    Mix,
    Notice,
    Order,
  };
  const connection = await db.sequelize.sync();
  return connection;
};
