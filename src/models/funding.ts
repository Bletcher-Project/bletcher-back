import { Model, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

export default class Funding extends Model {
  public readonly createdAt!: Date;

  public static associations: {
    accounts: Association<User, Post>;
  };
}

Funding.init(
  {},
  {
    tableName: 'funding',
    sequelize,
    timestamps: true,
    deletedAt: false,
    updatedAt: false,
    paranoid: true,
    underscored: true,
  },
);

User.belongsToMany(Post, { through: Funding });
Post.belongsToMany(User, { through: Funding });
