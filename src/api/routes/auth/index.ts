import { Router } from 'express';
import { postSignIn, check, getUserInfo } from './authController';
import checkJWT from '../../middleware/checkJwt';

const authRouter = Router();

export default (app: Router) => {
  app.use('/auth', authRouter);

  authRouter.post('/signin', postSignIn);

  authRouter.use('/check', checkJWT);
  authRouter.get('/check', check);

  authRouter.use('/user', checkJWT);
  authRouter.get('/user', getUserInfo);
};
