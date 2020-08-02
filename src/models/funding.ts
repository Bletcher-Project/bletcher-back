import { Model, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

export default class Funding extends Model {
  public readonly created_at!: Date;

  public static associations: {
    fundings: Association<User, Post>;
  };
}

Funding.init(
  {},
  {
    tableName: 'funding',
    sequelize,
    timestamps: true,
    underscored: true,
    deletedAt: false,
    updatedAt: false,
    paranoid: true,
  },
);

User.belongsToMany(Post, { through: Funding, foreignKey: 'user_id' });
Post.belongsToMany(User, { through: Funding, foreignKey: 'post_id' });
