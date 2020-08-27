import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import checkJWT from '../middleware/checkJwt';
import { IJwtRequest } from '../../interfaces/auth';
import { IUserAction } from '../../interfaces/user';
import {
  checkFavoriteExists,
  addFavorite,
  deleteFavorite,
  getPostFavorites,
} from '../../services/favorite';
import { getPostByPostId } from '../../services/post';
import {
  POST_NOT_EXISTS,
  FAVORITE_POST_SUCCESS,
  FAVORITE_DELETE_SUCCESS,
  EXIST_FAVORITE,
  NOT_EXIST_FAVORITE,
  GET_FAVORITES_SUCCESS,
} from '../../util/response/message';
import response from '../../util/response';

const favoriteRouter = Router();

favoriteRouter.post(
  '/:postid',
  checkJWT,
  celebrate({
    [Segments.PARAMS]: {
      postid: Joi.number().integer().required(),
    },
  }),
  async (req: IJwtRequest, res: Response, next: NextFunction) => {
    const postid: number = parseInt(req.params.postid, 10);
    try {
      const post = await getPostByPostId(postid);
      if (!post) {
        return res.status(400).json(response.response400(POST_NOT_EXISTS));
      }

      const userAction = { user_id: req.decoded?.id, post_id: postid };
      if (await checkFavoriteExists(userAction as IUserAction)) {
        return res.status(409).json(response.response409(EXIST_FAVORITE));
      }

      await addFavorite(userAction as IUserAction);
      return res.status(200).json(response.response200(FAVORITE_POST_SUCCESS));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

favoriteRouter.delete(
  '/:postid',
  checkJWT,
  celebrate({
    [Segments.PARAMS]: {
      postid: Joi.number().integer().required(),
    },
  }),
  async (req: IJwtRequest, res: Response, next: NextFunction) => {
    const postid: number = parseInt(req.params.postid, 10);
    try {
      const post = await getPostByPostId(postid);
      if (!post) {
        return res.status(400).json(response.response400(POST_NOT_EXISTS));
      }

      const userAction = { user_id: req.decoded?.id, post_id: postid };
      if (!(await checkFavoriteExists(userAction as IUserAction))) {
        return res.status(409).json(response.response409(NOT_EXIST_FAVORITE));
      }

      await deleteFavorite(userAction as IUserAction);
      return res.status(200).json(response.response200(FAVORITE_DELETE_SUCCESS));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

favoriteRouter.get(
  '/:postid',
  celebrate({
    [Segments.PARAMS]: {
      postid: Joi.number().integer().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const postid: number = parseInt(req.params.postid, 10);
    try {
      const post = await getPostByPostId(postid);
      if (!post) {
        return res.status(400).json(response.response400(POST_NOT_EXISTS));
      }

      const favorites = await getPostFavorites(postid);
      const users = favorites.map((fav) => fav.user_id);
      const count = favorites.length;

      return res.status(200).json(response.response200(GET_FAVORITES_SUCCESS, { users, count }));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

export default favoriteRouter;
