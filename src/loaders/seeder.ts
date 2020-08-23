import Category from '../models/category';

export default async (): Promise<void> => {
  await Category.bulkCreate(
    [
      { id: 1, name: 'Home', left: 1, right: 102, parent_id: null },

      { id: 2, name: '대분류1', left: 2, right: 21, parent_id: 1 },
      { id: 3, name: '대분류2', left: 22, right: 41, parent_id: 1 },
      { id: 4, name: '대분류3', left: 42, right: 61, parent_id: 1 },
      { id: 5, name: '대분류4', left: 62, right: 81, parent_id: 1 },
      { id: 6, name: '대분류5', left: 82, right: 101, parent_id: 1 },

      { id: 7, name: '중분류1', left: 3, right: 8, parent_id: 2 },
      { id: 8, name: '중분류2', left: 9, right: 14, parent_id: 2 },
      { id: 9, name: '중분류3', left: 15, right: 20, parent_id: 2 },

      { id: 10, name: '중분류1', left: 23, right: 28, parent_id: 3 },
      { id: 11, name: '중분류2', left: 29, right: 34, parent_id: 3 },
      { id: 12, name: '중분류3', left: 35, right: 40, parent_id: 3 },

      { id: 13, name: '중분류1', left: 43, right: 48, parent_id: 4 },
      { id: 14, name: '중분류2', left: 49, right: 54, parent_id: 4 },
      { id: 15, name: '중분류3', left: 55, right: 60, parent_id: 4 },

      { id: 16, name: '중분류1', left: 63, right: 68, parent_id: 5 },
      { id: 17, name: '중분류2', left: 69, right: 74, parent_id: 5 },
      { id: 18, name: '중분류3', left: 75, right: 80, parent_id: 5 },

      { id: 19, name: '중분류1', left: 83, right: 88, parent_id: 6 },
      { id: 20, name: '중분류2', left: 89, right: 94, parent_id: 6 },
      { id: 21, name: '중분류3', left: 95, right: 100, parent_id: 6 },

      { id: 22, name: '소분류1', left: 4, right: 5, parent_id: 7 },
      { id: 23, name: '소분류2', left: 6, right: 7, parent_id: 7 },

      { id: 24, name: '소분류1', left: 10, right: 11, parent_id: 8 },
      { id: 25, name: '소분류2', left: 12, right: 13, parent_id: 8 },

      { id: 26, name: '소분류1', left: 16, right: 17, parent_id: 9 },
      { id: 27, name: '소분류2', left: 18, right: 19, parent_id: 9 },

      { id: 28, name: '소분류1', left: 24, right: 25, parent_id: 10 },
      { id: 29, name: '소분류2', left: 26, right: 27, parent_id: 10 },

      { id: 30, name: '소분류1', left: 30, right: 31, parent_id: 11 },
      { id: 31, name: '소분류2', left: 32, right: 33, parent_id: 11 },

      { id: 32, name: '소분류1', left: 36, right: 37, parent_id: 12 },
      { id: 33, name: '소분류2', left: 38, right: 39, parent_id: 12 },

      { id: 34, name: '소분류1', left: 44, right: 45, parent_id: 13 },
      { id: 35, name: '소분류2', left: 46, right: 47, parent_id: 13 },

      { id: 36, name: '소분류1', left: 50, right: 51, parent_id: 14 },
      { id: 37, name: '소분류2', left: 52, right: 53, parent_id: 14 },

      { id: 38, name: '소분류1', left: 56, right: 57, parent_id: 15 },
      { id: 39, name: '소분류2', left: 58, right: 59, parent_id: 15 },

      { id: 40, name: '소분류1', left: 64, right: 65, parent_id: 16 },
      { id: 41, name: '소분류2', left: 66, right: 67, parent_id: 16 },

      { id: 42, name: '소분류1', left: 70, right: 71, parent_id: 17 },
      { id: 43, name: '소분류2', left: 72, right: 73, parent_id: 17 },

      { id: 44, name: '소분류1', left: 76, right: 77, parent_id: 18 },
      { id: 45, name: '소분류2', left: 78, right: 79, parent_id: 18 },

      { id: 46, name: '소분류1', left: 84, right: 85, parent_id: 19 },
      { id: 47, name: '소분류2', left: 86, right: 87, parent_id: 19 },

      { id: 48, name: '소분류1', left: 90, right: 91, parent_id: 20 },
      { id: 49, name: '소분류2', left: 92, right: 93, parent_id: 20 },

      { id: 50, name: '소분류1', left: 96, right: 97, parent_id: 21 },
      { id: 51, name: '소분류2', left: 98, right: 99, parent_id: 21 },
    ],
    { validate: true },
  );
};
