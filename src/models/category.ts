import { Model, DataTypes, Association } from 'sequelize';
import sequelize from '../config/database';
import Post from './post';

export default class Category extends Model {
  public id!: number;

  public parentId!: number;

  public name!: string;

  public left!: number;

  public right!: number;

  public static associations: {
    accounts: Association<Post, Category>;
  };
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    left: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    right: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'category',
    sequelize,
  },
);

// 하나의 테이블이 셀프 조인되는 예제
Category.hasMany(Category, {
  as: 'sub_cat',
  foreignKey: 'parent',
});

Category.belongsTo(Category, {
  foreignKey: 'parent',
});

Category.hasMany(Post, {
  as: 'category',
});
