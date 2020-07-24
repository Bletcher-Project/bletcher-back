import { Model, DataTypes, Association } from "sequelize";
import { sequelize } from "../config/database";
import User from "../models/user";

export default class Account extends Model {
  public id!: number;
  public userId!: number;
  public account_number!: number;
  public bank_name!: string;

  public static associations: {
    accounts: Association<User, Account>;
  };
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    account_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bank_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "account",
    sequelize: sequelize,
  }
);
