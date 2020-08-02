import { Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

export default class Favorite extends Model {
  public readonly created_at!: Date;

  public user_id!: number;

  public post_id!: number;
}

Favorite.init(
  {},
  {
    tableName: 'favorite',
    sequelize,
    timestamps: true,
    updatedAt: false,
    underscored: true,
  },
);

User.belongsToMany(Post, { through: Favorite, foreignKey: 'user_id' });
Post.belongsToMany(User, { through: Favorite, foreignKey: 'post_id' });
