import Category from '../models/category';

export const getAllCategories = async (): Promise<Category[] | null> => {
  const allCategory = await Category.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: Category,
        as: 'sub_category',
        attributes: ['id', 'name'],
      },
    ],
  });
  return allCategory;
};

export const getGroupCategories = async (
  name: number,
): Promise<Category[] | null> => {
  const category = await Category.findOne({
    where: { name },
  });
  if (!category) {
    return null;
  }
  const groupCategory = await Category.findAll({
    attributes: ['id', 'name'],
    where: { name },
    include: [
      {
        model: Category,
        as: 'sub_category',
        attributes: ['id', 'name'],
        order: [['left', 'DESC']],
      },
    ],
  });
  return groupCategory;
};
