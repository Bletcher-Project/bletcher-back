import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { sequelize } from "config/database";

class Post extends Model {
  public id!: number;
  public postImgName!: string;
  public postImgWidth!: number;
  public postImgHeight!: number;
  public content!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    postImgName: {
      type: new DataTypes.STRING(300),
      allowNull: false,
    },
    postImgWidth: {
      type: new DataTypes.DECIMAL(),
      allowNull: false,
    },
    postImgHeight: {
      type: new DataTypes.DECIMAL(),
      allowNull: false,
    },
    content: {
      type: new DataTypes.STRING(10000),
      allowNull: true,
    },
  },
  {
    tableName: "Post",
    sequelize: sequelize,
  }
);
