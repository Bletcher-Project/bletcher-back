import { Router } from 'express';
import auth from './auth';
import users from './users';
import images from './images';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/images', images);

export default router;
