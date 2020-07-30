import { Op } from 'sequelize';
import User from '../models/user';
import { IUserforSignUp, IUserInfo } from '../interfaces/user';

export const createUser = async (userInfo: IUserforSignUp): Promise<void> => {
  await User.create({
    email: userInfo.email,
    user_id: userInfo.user_id,
    password: userInfo.password,
  });
};

export const getAllUser = async () => {
  const allUser = await User.findAll({});
  return allUser;
};

export const getUserByUserInfo = async (userInfo: IUserInfo) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { id: userInfo.id || null },
        { email: userInfo.email || null },
        { user_id: userInfo.userId || null },
      ],
    },
  });
  return user;
};

export const deleteUser = async (id: number) => {
  const user = await User.destroy({
    where: { id },
  });
  return user;
};
