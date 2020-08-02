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
  },
  {
    tableName: 'notice',
    sequelize,
  },
);

Notice.belongsTo(User, {
  foreignKey: { name: 'user_send_id', allowNull: false },
});
Notice.belongsTo(User, {
  foreignKey: { name: 'user_receive_id', allowNull: false },
});
Notice.belongsTo(Post, { foreignKey: { name: 'post_id', allowNull: false } });
