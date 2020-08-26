import { QueryTypes } from 'sequelize';
import Category from '../models/category';
import sequelize from '../config/database';

export const getAllCategories = async (): Promise<Category[] | null> => {
  const allCategory = await Category.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: Category,
        as: 'sub_category',
        required: true,
        attributes: ['id', 'name'],
        order: [['left', 'DESC']],
      },
    ],
  });
  return allCategory;
};

export const getGroupCategories = async (
  id: number,
): Promise<Category[] | null> => {
  const existcategory = await Category.findByPk(id);
  if (!existcategory) {
    return null;
  }
  const groupCategory = await Category.findAll({
    attributes: ['id', 'name'],
    where: { id },
    include: [
      {
        model: Category,
        as: 'sub_category',
        required: true,
        attributes: ['id', 'name'],
        order: [['left', 'DESC']],
      },
    ],
  });
  return groupCategory;
};

export const getNestedCategories = async (
  id: number,
): Promise<Object[] | null> => {
  const existcategory = await Category.findByPk(id);
  if (!existcategory) {
    return null;
  }
  const query = 'SELECT  sub_category.id, sub_category.name FROM `category` AS `Category` INNER JOIN `category` AS `sub_category` ON  (`sub_category`.`left` >= `Category`.`left` AND `sub_category`.`left` <= `Category`.`right`) WHERE `Category`.`id` = :id ORDER BY sub_category.left;';
  const queryparam = {
    id,
  };
  const result = await sequelize.query(query, {
    replacements: queryparam,
    type: QueryTypes.SELECT,
  });
  return result;
};
