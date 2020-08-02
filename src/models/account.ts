import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

export default class Account extends Model {
  public id!: number;

  public account_number!: number;

  public bank_name!: string;

  public user_id!: number;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    account_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'account',
    sequelize,
  },
);

Account.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false } });
