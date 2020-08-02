import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

export default class Favorite extends Model {
  public user_id!: number;

  public post_id!: number;

  public readonly created_at!: Date;
}

Favorite.init(
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
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
