import { Router } from 'express';
import auth from './auth';
import users from './users';
import images from './images';
import posts from './posts';
import categories from './categories';
import favorites from './favorites';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/images', images);
router.use('/posts', posts);
router.use('/categories', categories);
router.use('/favorites', favorites);

export default router;
