import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';

export default class Shopitem extends Model {
  public post_id!: number;

  public posterSalesAmount!: number;

  public coloringSalesAmount!: string;

  public goodsSalesAmount!: number;

  public static associations: {
    accounts: Association<Post, Shopitem>;
  };
}

Shopitem.init(
  {
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    posterSalesAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coloringSalesAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goodsSalesAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'shopitem',
    sequelize,
    underscored: true,
  },
);

Shopitem.belongsTo(Post);
