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
    origin_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    sub_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'mix',
    sequelize,
  },
);

Mix.belongsTo(User, { foreignKey: 'origin_user' });
Mix.belongsTo(User, { foreignKey: 'sub_user' });
Mix.belongsTo(Post, { foreignKey: 'post_id' });
