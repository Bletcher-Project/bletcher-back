import { Router } from 'express';
import { postSignIn, check, getUserInfo } from './auth.controller';
import checkJWT from '../../middleware/checkJwt';

const authRouter = Router();

authRouter.post('/user', postSignIn);

authRouter.use('/check', checkJWT);
authRouter.get('/check', check);

authRouter.use('/user', checkJWT);
authRouter.get('/user', getUserInfo);

export default authRouter;
