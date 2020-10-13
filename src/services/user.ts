import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { IUserforSignUp, IUserInfo, IUserModify } from '../interfaces/user';
import { passwordMatch } from './auth';

export const createUser = async (userInfo: IUserforSignUp): Promise<void> => {
  await User.create({
    email: userInfo.email,
    nickname: userInfo.nickname,
    password: userInfo.password,
  });
};

export const getAllUser = async (): Promise<User[] | null> => {
  const allUser = await User.findAll({});
  return allUser;
};

export const getUserByUserInfo = async (userInfo: IUserInfo): Promise<User | null> => {
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

export const getUsernameById = async (id: number): Promise<User | null> => {
  const nickname = await User.findOne({ where: { id }, raw: true, attributes: ['nickname'] });
  return nickname;
};

export const deleteUser = async (id: number): Promise<number> => {
  const user = await User.destroy({
    where: { id },
  });
  return user;
};

export const modifyUser = async (userInfo: IUserModify, id: number): Promise<User | null> => {
  const existUser = await User.findByPk(id);
  if (!existUser) {
    return null;
  }
  const inputPassword = userInfo.password;
  if (inputPassword) {
    const isPasswordMatch = passwordMatch(inputPassword, existUser);
    if (!isPasswordMatch) {
      const encryptedPw = await bcrypt.hash(inputPassword, 10);
      existUser.update(
        {
          password: encryptedPw,
        },
        { where: { id } },
      );
    }
  }
  const user = existUser.update(
    {
      email: userInfo.email,
      nickname: userInfo.nickname,
      introduce: userInfo.introduce,
      profile_image: userInfo.profile_image,
    },
    { where: { id } },
  );
  return user;
};
