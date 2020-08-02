import { Op } from 'sequelize';
import User from '../models/user';
import { IUserforSignUp, IUserInfo } from '../interfaces/user';

console.log('hello');

export const createUser = async (userInfo: IUserforSignUp): Promise<void> => {
  await User.create({
    email: userInfo.email,
    nickname: userInfo.nickname,
    password: userInfo.password,
  });
  return false;
};

export const getAllUser = async () => {
  const allUser = await User.findAll({});
  return allUser;
};

export const getUserByUserInfo = async (
  userInfo: IUserInfo,
): Promise<User | null> => {
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { id: userInfo.id || null },
        { email: userInfo.email || null },
        { nickname: userInfo.nickname || null },
      ],
    },
  });
  return user;
};

export const deleteUser = async (id: number): Promise<number> => {
  const user = await User.destroy({
    where: { id },
  });
  return user;
};
