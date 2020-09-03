import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Category from './category';
import Image from './image';
import Mix from './mix';

export default class Post extends Model {
  public id!: number;

  public title!: string;

  public description!: string;

  public is_public!: boolean;

  public user_id!: number;

  public image_id!: number;

  public category_id!: number;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;
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
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    image_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'post',
    sequelize,
    timestamps: true,
    underscored: true,
  },
);

Post.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Post.belongsTo(Category, { foreignKey: 'category_id' });
Post.belongsTo(Image, { foreignKey: 'image_id' });
