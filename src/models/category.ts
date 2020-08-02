import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';

export default class Category extends Model {
  public id!: number;

  public parent_id!: number;

  public name!: string;

  public left!: number;

  public right!: number;

  public static associations: {
    categorys: Association<Post, Category>;
  };
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    left: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    right: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'category',
    sequelize,
  },
);

Category.hasMany(Category, {
  as: 'sub_category',
  foreignKey: 'parent_id',
});
Category.belongsTo(Category, {
  foreignKey: 'parent_id',
});
