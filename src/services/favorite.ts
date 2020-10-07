import Favorite from '../models/favorite';
import { IUserAction } from '../interfaces/user';

export const checkFavoriteExists = async (params: IUserAction): Promise<boolean> => {
  const favorite: Favorite | null = await Favorite.findOne({
    where: { user_id: params.user_id, post_id: params.post_id },
  });
  return favorite != null;
};

export const addFavorite = async (params: IUserAction): Promise<void> => {
  await Favorite.create({ user_id: params.user_id, post_id: params.post_id });
};

export const deleteFavorite = async (params: IUserAction): Promise<number> => {
  const result: number = await Favorite.destroy({
    where: { user_id: params.user_id, post_id: params.post_id },
  });
  return result;
};

export const isFavoritePost = async (post_id: number, user_id: number): Promise<boolean> => {
  const result: Favorite | null = await Favorite.findOne({
    where: {
      post_id,
      user_id,
    },
  });

  if (!result) return false;
  return true;
};

export const getUserFavorites = async (
  user_id: number,
  page: number = 1,
  limit: number = 10,
): Promise<Favorite[]> => {
  const offset = limit * (page - 1);
  const favorites: Favorite[] = await Favorite.findAll({
    where: {
      user_id,
    },
    order: [['created_at', 'DESC']],
    offset,
    limit,
  });
  return favorites;
};
