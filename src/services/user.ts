import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import User from '../models/user';
import Image from '../models/image';
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
  const allUser = await User.findAll({
    include: [
      {
        model: Image,
        attributes: ['id', 'path'],
      },
    ],
  });
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
    include: [
      {
        model: Image,
        attributes: ['id', 'path'],
      },
    ],
  });
  return user;
};

export const deleteUser = async (id: number): Promise<number> => {
  const user = await User.destroy({
    where: { id },
  });
  return user;
};

export const modifyUser = async (userInfo: IUserModify): Promise<User | null> => {
  const existUser: User | null = await User.findByPk(userInfo.id);
  if (!existUser) {
    return null;
  }
  const inputPassword = userInfo.password;
  if (inputPassword) {
    if (!(await passwordMatch(inputPassword, existUser.id))) {
      const encryptedPw = await bcrypt.hash(inputPassword, 10);
      existUser.update({
        password: encryptedPw,
      });
    }
  }
  const user = existUser.update({
    email: userInfo.email,
    nickname: userInfo.nickname,
    introduce: userInfo.introduce,
    profile_image: userInfo.profile_image,
  });
  return user;
};
