import { Model } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

export default class Funding extends Model {
  public readonly created_at!: Date;

  public user_id!: number;

  public post_id!: number;
}

Funding.init(
  {},
  {
    tableName: 'funding',
    sequelize,
    timestamps: true,
    updatedAt: false,
    underscored: true,
  },
);

User.belongsToMany(Post, { through: Funding, foreignKey: 'user_id' });
Post.belongsToMany(User, { through: Funding, foreignKey: 'post_id' });
