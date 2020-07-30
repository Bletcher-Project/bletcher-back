import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import { IUserforSignUp, IUserInfo } from '../../interfaces/user';
import {
  createUser,
  getAllUser,
  getUserByUserInfo,
  deleteUser,
} from '../../services/user';
import { SIGN_UP_SUCCESS, EXIST_USER } from '../../constants/responseMessage';

const userRouter = Router();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      userId: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    Logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
    const { email, userId } = req.body;
    try {
      const existUser = await getUserByUserInfo({ email, userId });
      if (existUser) {
        return res.status(409).json({
          status: '409 Conflict',
          message: EXIST_USER,
        });
      }
      await createUser(req.body as IUserforSignUp);
      return res.status(200).json({
        status: '200 OK',
        message: SIGN_UP_SUCCESS,
      });
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
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
    const id = parseInt(req.params.id, 10);
    try {
      const deletedUser = await deleteUser(id);
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
