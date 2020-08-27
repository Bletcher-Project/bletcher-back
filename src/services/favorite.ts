import Favorite from '../models/favorite';
import { IUserAction } from '../interfaces/user';

export const checkFavoriteExists = async (params: IUserAction): Promise<boolean> => {
  const favorite = await Favorite.findOne({
    where: { user_id: params.user_id, post_id: params.post_id },
  });
  return favorite != null;
};

export const addFavorite = async (params: IUserAction): Promise<void> => {
  await Favorite.create({ user_id: params.user_id, post_id: params.post_id });
};

export const deleteFavorite = async (params: IUserAction): Promise<number> => {
  const result = await Favorite.destroy({
    where: { user_id: params.user_id, post_id: params.post_id },
  });

  return result;
};
