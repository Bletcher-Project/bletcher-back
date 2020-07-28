import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';
import Order from './order';

export default class Shopitem extends Model {
  public id!: number;

  public posterSalesAmount!: number;

  public coloringSalesAmount!: string;

  public goodsSalesAmount!: number;

  public static associations: {
    accounts: Association<Post, Shopitem>;
  };
}

Shopitem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    posterSalesAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coloringSalesAmount: {
      type: DataTypes.STRING,
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
  },
);

Shopitem.belongsTo(Post);

Shopitem.hasMany(Order, {
  foreignKey: 'shopitemId',
  sourceKey: 'id',
  as: 'orders',
});
