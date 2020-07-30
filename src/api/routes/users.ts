import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import {
  createUser,
  getAllUser,
  getUserByUserInfo,
  deleteUser,
} from '../../services/user';
import { IUserforSignUp, IUserInfo } from '../../interfaces/user';

const userRouter = Router();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      user_id: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await createUser(req.body as IUserforSignUp);
      return res.status(200).json({ success: 1 });
    } catch (error) {
      return next(error);
    }
  },
);

userRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.number().integer(),
      email: Joi.string().email(),
      userId: Joi.string(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, email, userId } = req.query;
    try {
      if (!id && !email && !userId) {
        const allUser = await getAllUser();
        return res.status(200).json({ allUsers: allUser });
      }
      const user = await getUserByUserInfo(req.query as IUserInfo);
      if (user) {
        return res.status(200).json({ userInfo: user });
      }
      return res.status(204).json({ exist: 0 });
    } catch (error) {
      return next(error);
    }
  },
);

userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const deletedUser = await deleteUser(parseInt(id, 10));
      if (deletedUser) {
        return res.status(200).json({ delete: 1 });
      }
      return res.status(400).json({ delete: 0 });
    } catch (error) {
      return next(error);
    }
  },
);

export default userRouter;
