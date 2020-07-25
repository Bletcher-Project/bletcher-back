import { Application } from 'express';
import expressLoader from './express';
import sequelizeLoader from './sequelize';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: Application }) => {
  await sequelizeLoader();
  Logger.info('DB successfully connected');

  expressLoader({ app: expressApp });
  Logger.info('Express loaded');
};
