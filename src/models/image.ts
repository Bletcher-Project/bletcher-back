import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export default class Image extends Model {
  public id!: number;

  public name!: string;

  public type!: string;

  public path!: string;
}

Image.init(
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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'image',
    sequelize,
  },
);
