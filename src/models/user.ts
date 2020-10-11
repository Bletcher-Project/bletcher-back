import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/database';

export default class User extends Model {
  public id!: number;

  public email!: string;

  public nickname!: string;

  public password!: string;

  public introduce!: string | null;

  public profile_image!: string | null;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    introduce: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    profile_image: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    tableName: 'user',
    sequelize,
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        const encryptedPw = await bcrypt.hash(user.password, 10);
        user.password = encryptedPw;
      },
      // beforeBulkUpdate: async (user) => {
      //   console.log(user);
      //   const encryptedPw = await bcrypt.hash(user.password, 10);
      //   user.password = encryptedPw;
      // },
    },
  },
);
