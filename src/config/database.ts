import { Sequelize } from 'sequelize';
import config from './index';

const sequelize = new Sequelize(
  config.database.dbname as string,
  config.database.username as string,
  config.database.password as string,
  {
    host: config.database.host,
    dialect: 'mariadb',
    dialectOptions: { connectTimeout: 1000 },
    define: {
      timestamps: false,
    },
  },
);

export default sequelize;
