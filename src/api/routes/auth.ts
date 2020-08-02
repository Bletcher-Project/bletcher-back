import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import checkJWT from '../middleware/checkJwt';
import { IAuthUser, IJwtRequest } from '../../interfaces/auth';
import { authenticate, authorize, getUserById } from '../../services/auth';
import { AUTH_SUCCESS, AUTH_FAIL } from '../../util/response/message';
import response from '../../util/response';

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
        return res.status(401).json(response.response401(AUTH_FAIL));
      }
      const token = authorize(user);
      return res
        .status(200)
        .json(response.response200(AUTH_SUCCESS, { user, token }));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

authRouter.get(
  '/',
  checkJWT,
  async (req: IJwtRequest, res: Response, next: NextFunction) => {
    try {
      const user = await getUserById(req.decoded?.id);
      return res.status(200).json(response.response200(AUTH_SUCCESS, user));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

authRouter.get('/check', checkJWT, (req: IJwtRequest, res: Response) => {
  res.json({
    success: true,
    info: req.decoded,
  });
});

export default authRouter;
