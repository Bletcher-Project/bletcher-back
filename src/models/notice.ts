import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';
import User from './user';

export default class Notice extends Model {
  public id!: number;

  public notice_type!: string;

  public user_send_id!: number;

  public user_receive_id!: number;

  public post_id!: number;
}

Notice.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    notice_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_send_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    user_receive_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'notice',
    sequelize,
  },
);

Notice.belongsTo(User, { foreignKey: 'user_send_id' });
Notice.belongsTo(User, { foreignKey: 'user_receive_id' });
Notice.belongsTo(Post, { foreignKey: 'post_id' });
