import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

export default class Favorite extends Model {
  public id!: number;

  public readonly createdAt!: Date;

  public static associations: {
    accounts: Association<User, Post>;
  };
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    tableName: 'favorite',
    sequelize,
    timestamps: true,
    deletedAt: false,
    updatedAt: false,
    paranoid: true,
  },
);

Favorite.belongsTo(User, { foreignKey: 'userId' });
Favorite.belongsTo(Post, { foreignKey: 'PostId' });
