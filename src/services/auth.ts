import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../models/user';
import jwtKey from '../config';

export const authenticate = async (id: string, password: string) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: id }, { name: id }],
    },
  });
  if (!user) {
    return false;
  }

  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    return false;
  }

  return user;
};

/* Generate an auth token for the user */
export const authorize = (user: any) => {
  const p = new Promise((resolve, reject) => {
    jwt.sign(
      { id: user.id, email: user.email },
      jwtKey.toString(),
      {
        expiresIn: '7d',
        issuer: 'bletcher',
        subject: 'userInfo',
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
  return p;
};

export const getUser = async (id?: number) => {
  let user;
  if (id) {
    user = await User.findOne({
      where: {
        [Op.or]: [{ id }],
      },
    });
  }
  return user;
};
