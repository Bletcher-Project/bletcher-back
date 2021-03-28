import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';

export default class FundingPost extends Model {
  public post_id!: number;

  public is_expired!: boolean;

  public readonly created_at!: Date;
}

FundingPost.init(
  {
    post_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
    },
    is_expired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'funding_post',
    sequelize,
    timestamps: true,
    updatedAt: false,
    underscored: true,
  },
);

FundingPost.belongsTo(Post, { foreignKey: 'post_id' });
