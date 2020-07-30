import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';

export default class Image extends Model {
  public id!: number;

  public name!: string;

  public type!: string;

  public width!: number;

  public height!: number;

  public static associations: {
    accounts: Association<Post, Image>;
  };
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'image',
    sequelize,
    underscored: true,
  },
);

Image.belongsTo(Post, { foreignKey: 'postId' });
