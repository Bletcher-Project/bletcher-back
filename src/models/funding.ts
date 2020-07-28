import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Post from './post';

export default class Funding extends Model {
  public id!: number;

  public readonly createdAt!: Date;

  public static associations: {
    accounts: Association<User, Post>;
  };
}

Funding.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    tableName: 'funding',
    sequelize,
    timestamps: true,
    deletedAt: false,
    updatedAt: false,
    paranoid: true,
  },
);

Funding.belongsTo(User, { foreignKey: 'userId' });
Funding.belongsTo(Post, { foreignKey: 'PostId' });
