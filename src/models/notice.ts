import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';
import User from './user';

export default class Notice extends Model {
  public id!: number;

  public noticeType!: string;

  public static associations: {
    accounts: Association<User, Post>;
  };
}

Notice.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    noticeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'notice',
    sequelize,
    underscored: true,
  },
);

Notice.belongsTo(User, { foreignKey: 'userSendId' });
Notice.belongsTo(User, { foreignKey: 'userReceiveId' });
Notice.belongsTo(Post, { foreignKey: 'postId' });
