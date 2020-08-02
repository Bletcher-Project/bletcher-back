import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';
import User from './user';

export default class Notice extends Model {
  public id!: number;

  public notice_type!: string;

  public static associations: {
    notices: Association<User, Post>;
  };
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

Notice.belongsTo(User, { foreignKey: 'user_send_id' });
Notice.belongsTo(User, { foreignKey: 'user_receive_id' });
Notice.belongsTo(Post, { foreignKey: 'post_id' });
