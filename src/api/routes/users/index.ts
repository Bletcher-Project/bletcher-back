import { Router } from 'express';
import { getUser, postUser, deleteUser } from './users.controller';
import { uploadProfile } from '../../middleware/multer';

const userRouter = Router();

userRouter.get('/', getUser);

userRouter.use('/', uploadProfile);
userRouter.post('/', postUser);

userRouter.delete('/', deleteUser);

export default userRouter;
