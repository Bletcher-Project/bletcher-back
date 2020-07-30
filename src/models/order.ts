import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Shopitem from './shopitem';

export default class Order extends Model {
  public id!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date | null;

  public option!: string;

  public quantity!: number;

  public static associations: {
    posts: Association<User, Shopitem>;
  };
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    option: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'order',
    sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
  },
);

User.belongsToMany(Shopitem, { through: Order });
Shopitem.belongsToMany(User, { through: Order });
