import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';

export default class Mix extends Model {
  public post_id!: number;

  public origin_post_id!: number;

  public sub_post_id!: number;

  public is_expired!: boolean;

  public readonly created_at!: Date;
}

Mix.init(
  {
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    origin_post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    sub_post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    is_expired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'mix',
    sequelize,
    timestamps: true,
    updatedAt: false,
    underscored: true,
  },
);
Post.hasOne(Mix, { foreignKey: 'post_id' });
Mix.belongsTo(Post, { foreignKey: 'post_id' });
Mix.belongsTo(Post, { foreignKey: 'origin_post_id' });
Mix.belongsTo(Post, { foreignKey: 'sub_post_id' });
