import { Sequelize } from 'sequelize';
import config from './index';

const sequelize = new Sequelize(
  config.database.dbname as string,
  config.database.username as string,
  config.database.password as string,
  {
    host: config.database.host,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT+9',
      connectTimeout: 1000,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      dateStrings: true,
      typeCast: true,
    },
    define: {
      timestamps: false,
    },
    timezone: '+09:00',
  },
);

export default sequelize;
