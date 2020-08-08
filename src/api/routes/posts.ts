import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import { IPostInfo, IPostdetail } from '../../interfaces/post';
import {
  createPost,
  getAllPost,
  getPostByPostId,
  getPostByUserId,
  deletePost,
} from '../../services/post';
import {
  POST_UP_SUCCESS,
  GET_ALL_POST_SUCCESS,
  GET_ONE_POST_SUCCESS,
  GET_USER_POST_SUCCESS,
  AUTH_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
} from '../../util/response/message';
import response from '../../util/response';
import checkJWT from '../middleware/checkJwt';

const postRouter = Router();

postRouter.post(
  '/',
  checkJWT,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      is_public: Joi.boolean().required(),
      user_id: Joi.number().required(),
      category_id: Joi.number().required(),
    }),
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.user_id) {
        return res.status(409).json(response.response409(AUTH_FAIL));
      }
      const newpost = await createPost(req.body as IPostdetail);
      return res
        .status(200)
        .json(response.response200(POST_UP_SUCCESS, newpost));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

postRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      userid: Joi.number(),
      postid: Joi.number(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { userid, postid } = req.query;
    try {
      if (!userid && !postid) {
        const allPost = await getAllPost();
        return res
          .status(200)
          .json(response.response200(GET_ALL_POST_SUCCESS, allPost));
      }
      if (postid) {
        const onepost = await getPostByPostId(req.query as IPostInfo);
        return res
          .status(200)
          .json(response.response200(GET_ONE_POST_SUCCESS, onepost));
      }
      if (userid) {
        const userpost = await getPostByUserId(req.query as IPostInfo);
        return res
          .status(200)
          .json(response.response200(GET_USER_POST_SUCCESS, userpost));
      }

      return res.status(204).end();
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

postRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);

    try {
      const deletedPost = await deletePost(id);
      if (deletedPost) {
        return res
          .status(200)
          .json(response.response200(DELETE_POST_SUCCESS, deletedPost));
      }
      return res.status(400).json(response.response400(DELETE_POST_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

export default postRouter;
