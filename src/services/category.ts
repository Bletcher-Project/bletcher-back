import { Op } from 'sequelize';
import Category from '../models/category';

export const getAllCategories = async (): Promise<Category[] | null> => {
  const allCategory = await Category.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: Category,
        as: 'sub_category',
        required: true,
        attributes: ['id', 'name'],
      },
    ],
  });
  return allCategory;
};

export const getGroupCategories = async (
  id: number,
): Promise<Category[] | null> => {
  const category = await Category.findOne({
    where: { id },
  });
  if (!category) {
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
