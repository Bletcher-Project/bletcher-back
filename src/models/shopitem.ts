import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';

export default class Shopitem extends Model {
  public id!: number;

  public poster_sales_amount!: number;

  public coloring_sales_amount!: string;

  public goods_sales_amount!: number;

  public post_id!: number;
}

Shopitem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    poster_sales_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coloring_sales_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goods_sales_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'shopitem',
    sequelize,
  },
);

Shopitem.belongsTo(Post, { foreignKey: { name: 'post_id', allowNull: false } });
