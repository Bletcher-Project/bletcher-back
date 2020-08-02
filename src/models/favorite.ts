import { Model, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

export default class Favorite extends Model {
  public readonly created_at!: Date;

  public static associations: {
    favorites: Association<User, Post>;
  };
}

Favorite.init(
  {},
  {
    tableName: 'favorite',
    sequelize,
    timestamps: true,
    underscored: true,
    deletedAt: false,
    updatedAt: false,
    paranoid: true,
  },
);

User.belongsToMany(Post, { through: Favorite, foreignKey: 'user_id' });
Post.belongsToMany(User, { through: Favorite, foreignKey: 'post_id' });
