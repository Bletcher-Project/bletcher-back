import { Application } from 'express';
import expressLoader from './express';
import sequelizeLoader from './sequelize';
import Logger from './logger';
import cloudinaryLoader from './cloudinary';

export default async ({ expressApp }: { expressApp: Application }) => {
  await sequelizeLoader();
  Logger.info('DB successfully connected');

  expressLoader({ app: expressApp });
  Logger.info('Express loaded');

  cloudinaryLoader();
  Logger.info('Cloudinary Storage connected');
};
