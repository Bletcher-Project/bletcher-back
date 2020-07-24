import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { sequelize } from "config/database";

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public profileImgName!: string | null;
  public status!: string | null;

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
      unique: true,
    },
    email: {
      type: new DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    profileImgName: {
      type: new DataTypes.STRING(300),
      allowNull: true,
    },
    status: {
      type: new DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "User",
    sequelize: sequelize,
  }
);
