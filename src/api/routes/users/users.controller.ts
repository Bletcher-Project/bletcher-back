import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import User from '../../../models/user';

/*
  Get User
  GET /api/users => get all users
  GET /api/users?id=`id` => get user by id
  GET /api/users?name=`name` => get user by name
  GET /api/users?email=`email` => get user by email
*/
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.query;
  const { email } = req.query;
  const { name } = req.query;
  try {
    if (!id && !email && !name) {
      const exUser = await User.findAll({});
      if (exUser) {
        return res.status(200).json({ allUsers: exUser });
      }
    } else {
      const exUser = await User.findOne({
        where: {
          [Op.or]: [
            { id: id?.toString() || null },
            { email: email?.toString() || null },
            { name: name?.toString() || null },
          ],
        },
      });
      if (exUser) {
        return res.status(200).json({ userInfo: exUser });
      }
      return res.status(204).json({ exist: 0 });
    }
  } catch (error) {
    return next(error);
  }
};

/*
  Post User (Signup)
  POST /api/users
*/
export const postUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, name, password, profileImgName, status, type } = req.body;
  const imgpath = req.file ? req.file.filename : null;

  try {
    const exUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { name }],
      },
    });
    if (exUser) {
      return res.status(400).json({ exist: 1 });
    }

    await User.create({
      email,
      name,
      password,
      profileImgName: imgpath,
      status,
      type,
    });
    return res.status(200).json({ success: 1 });
  } catch (error) {
    return next(error);
  }
};

/*
  Delete User
  Delete /api/users?id=`id` => delete user by id
*/
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.query;

  try {
    const user = await User.destroy({
      where: { id: id?.toString() || null },
    });
    if (user) {
      return res.status(200).json({ delete: 1 });
    }
    return res.status(400).json({ delete: 0 });
  } catch (error) {
    return next(error);
  }
};
