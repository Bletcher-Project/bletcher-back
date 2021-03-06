import schedule from 'node-schedule';
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
import Seeder from './seeder';
import { checkFundingExpired } from '../services/funding';
import Logger from './logger';
import FundingPost from '../models/fundingPost';

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
    FundingPost,
    Mix,
    Notice,
    Order,
  };
  const connection = await db.sequelize.sync();
  Seeder();
  schedule.scheduleJob('00 00 00 * * *', async () => {
    const checkExpired = await checkFundingExpired();
    if (checkExpired) {
      Logger.info(`${checkExpired}개의 게시글이 만료되었습니다.`);
    }
  });
  return connection;
};
