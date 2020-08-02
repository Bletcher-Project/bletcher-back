import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Category from './category';

export default class Post extends Model {
  public id!: number;

  public imageId!: number;

  public title!: string;

  public description!: string;

  public is_public!: boolean;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;

  public readonly deleted_at!: Date | null;

  public static associations: {
    posts: Association<User, Post>;
  };
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
    underscored: true,
    paranoid: true,
  },
);

Post.belongsTo(User, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});

Post.belongsTo(Category, { foreignKey: 'category_id' });
