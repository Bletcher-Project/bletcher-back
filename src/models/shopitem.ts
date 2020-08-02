import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';

export default class Shopitem extends Model {
  public post_id!: number;

  public poster_sales_amount!: number;

  public coloring_sales_amount!: string;

  public goods_sales_amount!: number;
}

Shopitem.init(
  {
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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

Shopitem.belongsTo(Post, { foreignKey: 'post_id' });
