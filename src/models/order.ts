import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Shopitem from './shopitem';

export default class Order extends Model {
  public id!: number;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;

  public readonly deleted_at!: Date | null;

  public option!: string;

  public quantity!: number;

  public static associations: {
    orders: Association<User, Shopitem>;
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
    underscored: true,
    paranoid: true,
  },
);

User.belongsToMany(Shopitem, { through: Order, foreignKey: 'user_id' });
Shopitem.belongsToMany(User, { through: Order, foreignKey: 'shopitem_id' });
