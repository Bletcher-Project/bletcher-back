import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';
import User from './user';

export default class Mix extends Model {
  public id!: number;

  public due_date!: Date;

  public origin_user!: number;

  public sub_user!: number | null;

  public post_id!: number;
}

Mix.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'mix',
    sequelize,
  },
);

Mix.belongsTo(User, { foreignKey: { name: 'origin_user', allowNull: false } });
Mix.belongsTo(User, { foreignKey: 'sub_user' });
Mix.belongsTo(Post, { foreignKey: { name: 'post_id', allowNull: false } });
