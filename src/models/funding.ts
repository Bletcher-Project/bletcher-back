import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

export default class Funding extends Model {
  public user_id!: number;

  public post_id!: number;

  public is_expired!: boolean;

  public readonly created_at!: Date;
}

Funding.init(
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    is_expired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
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
