import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import jwtKey from '../config';
import { IAuthUser } from '../interfaces/auth';

export const authenticate = async (
  authInfo: IAuthUser,
): Promise<User | null> => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: authInfo.id }, { user_id: authInfo.id }],
    },
  });
  if (!user) {
    return null;
  }

  const isPasswordMatch = bcrypt.compareSync(authInfo.password, user.password);
  if (!isPasswordMatch) {
    return null;
  }

  return user;
};

export const authorize = (user: User): string => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    jwtKey.toString(),
    {
      expiresIn: '7d',
      issuer: 'bletcher',
      subject: 'userInfo',
    },
  );
  return token;
};

export const getUserById = async (id?: number): Promise<User | null> => {
  if (id) {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ id }],
      },
    });
    return user;
  }
  return null;
};
