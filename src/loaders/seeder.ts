import Category from '../models/category';

export default async (): Promise<void> => {
  await Category.bulkCreate(
    [
      { id: 1, name: 'Home', left: 1, right: 132, parent_id: null },

      { id: 2, name: 'watercolor', left: 2, right: 27, parent_id: 1 },
      { id: 3, name: 'photography', left: 28, right: 53, parent_id: 1 },
      { id: 4, name: 'illustration', left: 54, right: 79, parent_id: 1 },
      { id: 5, name: 'sketch', left: 80, right: 105, parent_id: 1 },
      { id: 6, name: 'cartoon', left: 106, right: 131, parent_id: 1 },

      { id: 7, name: 'abstract', left: 3, right: 10, parent_id: 2 },
      { id: 8, name: 'contemporary', left: 11, right: 18, parent_id: 2 },
      { id: 9, name: 'simple', left: 19, right: 26, parent_id: 2 },

      { id: 10, name: 'abstract', left: 29, right: 36, parent_id: 3 },
      { id: 11, name: 'contemporary', left: 37, right: 44, parent_id: 3 },
      { id: 12, name: 'simple', left: 45, right: 52, parent_id: 3 },

      { id: 13, name: 'abstract', left: 55, right: 62, parent_id: 4 },
      { id: 14, name: 'contemporary', left: 63, right: 70, parent_id: 4 },
      { id: 15, name: 'simple', left: 71, right: 78, parent_id: 4 },

      { id: 16, name: 'abstract', left: 81, right: 88, parent_id: 5 },
      { id: 17, name: 'contemporary', left: 89, right: 96, parent_id: 5 },
      { id: 18, name: 'simple', left: 97, right: 104, parent_id: 5 },

      { id: 19, name: 'abstract', left: 107, right: 114, parent_id: 6 },
      { id: 20, name: 'contemporary', left: 115, right: 122, parent_id: 6 },
      { id: 21, name: 'simple', left: 123, right: 130, parent_id: 6 },

      { id: 22, name: 'people', left: 4, right: 5, parent_id: 7 },
      { id: 23, name: 'product', left: 6, right: 7, parent_id: 7 },
      { id: 24, name: 'animal', left: 8, right: 9, parent_id: 7 },

      { id: 25, name: 'people', left: 12, right: 13, parent_id: 8 },
      { id: 26, name: 'product', left: 14, right: 15, parent_id: 8 },
      { id: 27, name: 'animal', left: 16, right: 17, parent_id: 8 },

      { id: 28, name: 'people', left: 20, right: 21, parent_id: 9 },
      { id: 29, name: 'product', left: 22, right: 23, parent_id: 9 },
      { id: 30, name: 'animal', left: 24, right: 25, parent_id: 9 },

      { id: 31, name: 'people', left: 30, right: 31, parent_id: 10 },
      { id: 32, name: 'product', left: 32, right: 33, parent_id: 10 },
      { id: 33, name: 'animal', left: 34, right: 35, parent_id: 10 },

      { id: 34, name: 'people', left: 38, right: 39, parent_id: 11 },
      { id: 35, name: 'product', left: 40, right: 41, parent_id: 11 },
      { id: 36, name: 'animal', left: 42, right: 43, parent_id: 11 },

      { id: 37, name: 'people', left: 46, right: 47, parent_id: 12 },
      { id: 38, name: 'product', left: 48, right: 49, parent_id: 12 },
      { id: 39, name: 'animal', left: 50, right: 51, parent_id: 12 },

      { id: 40, name: 'people', left: 56, right: 57, parent_id: 13 },
      { id: 41, name: 'product', left: 58, right: 59, parent_id: 13 },
      { id: 42, name: 'animal', left: 60, right: 61, parent_id: 13 },

      { id: 43, name: 'people', left: 64, right: 65, parent_id: 14 },
      { id: 44, name: 'product', left: 66, right: 67, parent_id: 14 },
      { id: 45, name: 'animal', left: 68, right: 69, parent_id: 14 },

      { id: 46, name: 'people', left: 72, right: 73, parent_id: 15 },
      { id: 47, name: 'product', left: 74, right: 75, parent_id: 15 },
      { id: 48, name: 'animal', left: 76, right: 77, parent_id: 15 },

      { id: 49, name: 'people', left: 82, right: 83, parent_id: 16 },
      { id: 50, name: 'product', left: 84, right: 85, parent_id: 16 },
      { id: 51, name: 'animal', left: 86, right: 87, parent_id: 16 },

      { id: 52, name: 'people', left: 90, right: 91, parent_id: 17 },
      { id: 53, name: 'product', left: 92, right: 93, parent_id: 17 },
      { id: 54, name: 'animal', left: 94, right: 95, parent_id: 17 },

      { id: 55, name: 'people', left: 98, right: 99, parent_id: 18 },
      { id: 56, name: 'product', left: 100, right: 101, parent_id: 18 },
      { id: 57, name: 'animal', left: 102, right: 103, parent_id: 18 },

      { id: 58, name: 'people', left: 108, right: 109, parent_id: 19 },
      { id: 59, name: 'product', left: 110, right: 111, parent_id: 19 },
      { id: 60, name: 'animal', left: 112, right: 113, parent_id: 19 },

      { id: 61, name: 'people', left: 116, right: 117, parent_id: 20 },
      { id: 62, name: 'product', left: 118, right: 119, parent_id: 20 },
      { id: 63, name: 'animal', left: 120, right: 121, parent_id: 20 },

      { id: 64, name: 'people', left: 124, right: 125, parent_id: 21 },
      { id: 65, name: 'product', left: 126, right: 127, parent_id: 21 },
      { id: 66, name: 'animal', left: 128, right: 129, parent_id: 21 },
    ],
    { updateOnDuplicate: ['id'] },
  );
};
