import { Model, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

export default class Favorite extends Model {
  public readonly createdAt!: Date;

  public static associations: {
    accounts: Association<User, Post>;
  };
}

Favorite.init(
  {},
  {
    tableName: 'favorite',
    sequelize,
    timestamps: true,
    deletedAt: false,
    updatedAt: false,
    paranoid: true,
    underscored: true,
  },
);

User.belongsToMany(Post, { through: Favorite });
Post.belongsToMany(User, { through: Favorite });
