import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import Account from "../models/account";
import Address from "../models/address";

export default class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public user_id!: string;
  public password!: string;
  public phone!: string;
  public birth!: Date;
  public introduce!: string | null;
  public profile_image!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: new DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    birth: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    introduce: {
      type: new DataTypes.STRING(100),
      allowNull: true,
    },
    profile_image: {
      type: new DataTypes.STRING(300),
      allowNull: true,
    },
  },
  {
    tableName: "user",
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
  }
);

User.hasMany(Account, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "accounts",
});

User.hasMany(Address, {
  foreignKey: "userId",
  sourceKey: "id",
  as: "addresses",
});
