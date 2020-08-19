import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export default class Category extends Model {
  public id!: number;

  public name!: string;

  public left!: number;

  public right!: number;

  public parent_id!: number | null;
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
    parent_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
