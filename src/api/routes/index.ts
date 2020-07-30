import { Router } from 'express';
import { errors } from 'celebrate';
import auth from './auth';
import users from './users';
import images from './images';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/images', images);

router.use(errors());

export default router;
