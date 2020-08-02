import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Category from './category';

export default class Post extends Model {
  public id!: number;

  public title!: string;

  public description!: string;

  public is_public!: boolean;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;

  public readonly deleted_at!: Date | null;

  public user_id!: number;

  public category_id!: number;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'post',
    sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);

Post.belongsTo(User, {
  foreignKey: { name: 'user_id', allowNull: false },
});
Post.belongsTo(Category, {
  foreignKey: { name: 'category_id', allowNull: false },
});
