import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';
import User from './user';

export default class Mix extends Model {
  public due_date!: Date;

  public static associations: {
    mixs: Association<User, Post>;
  };
}

Mix.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'mix',
    sequelize,
  },
);

Mix.belongsTo(User, { foreignKey: 'origin_user' });
Mix.belongsTo(User, { foreignKey: 'sub_user' });
Mix.belongsTo(Post, { foreignKey: 'post_id' });
