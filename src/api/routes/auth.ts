import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import checkJWT from '../middleware/checkJwt';
import { IAuthUser, IJwtRequest } from '../../interfaces/auth';
import { authenticate, authorize, getUserById } from '../../services/auth';
import { AUTH_SUCCESS, AUTH_FAIL } from '../../constants/responseMessage';

const authRouter = Router();

authRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authenticate(req.body as IAuthUser);
      if (!user) {
        return res.status(401).json({
          status: '401 Unauthorized',
          message: AUTH_FAIL,
        });
      }
      const token = authorize(user);
      return res.status(200).json({
        status: '200 OK',
        message: AUTH_SUCCESS,
        data: { user, token },
      });
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

authRouter.get(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      token: Joi.string().token().required(),
    }),
  }),
  checkJWT,
  async (req: IJwtRequest, res: Response, next: NextFunction) => {
    try {
      const user = getUserById(req.decoded?.id);
      return res.status(200).json({
        status: '200 OK',
        message: AUTH_SUCCESS,
        data: { user },
      });
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

authRouter.get(
  '/check',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      token: Joi.string().token().required(),
    }),
  }),
  checkJWT,
  (req: IJwtRequest, res: Response) => {
    res.json({
      success: true,
      info: req.decoded,
    });
  },
);

export default authRouter;
