import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './user';

export default class Post extends Model {
  public id!: number;

  public imageId!: number;

  public title!: string;

  public description!: string;

  public is_public!: boolean;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

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
    paranoid: true,
  },
);

Post.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
