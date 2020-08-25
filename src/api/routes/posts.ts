import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import { IPostdetail } from '../../interfaces/post';
import {
  createPost,
  getPost,
  getPostByPostId,
  getPostByUserId,
  getPostByCategoryId,
  deletePost,
  editPost,
} from '../../services/post';
import { getNestedCategories } from '../../services/category';
import {
  POST_UP_SUCCESS,
  GET_ALL_POST_SUCCESS,
  GET_ONE_POST_SUCCESS,
  GET_USER_POST_SUCCESS,
  GET_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  GET_POST_BY_CATEGORY_SUCCESS,
  GET_POST_BY_NESTED_SUCCESS,
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
      image_id: Joi.number().required(),
    }),
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
      page: Joi.number().greater(0),
      limit: Joi.number().greater(0),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit } = req.query as any;
    try {
      const allPost = await getPost(page, limit);
      if (allPost) {
        return res
          .status(200)
          .json(response.response200(GET_ALL_POST_SUCCESS, allPost));
      }
      return res.status(400).json(response.response400(GET_POST_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

postRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const postId: number = parseInt(req.params.id, 10);
    try {
      if (postId) {
        const onePost = await getPostByPostId(postId);
        return res
          .status(200)
          .json(response.response200(GET_ONE_POST_SUCCESS, onePost));
      }
      return res.status(400).json(response.response400(GET_POST_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

postRouter.get(
  '/user/:id',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().greater(0),
      limit: Joi.number().greater(0),
    },
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = parseInt(req.params.id, 10);
    const { page, limit } = req.query as any;
    try {
      const userPost = await getPostByUserId(userId, page, limit);
      if (userPost) {
        return res
          .status(200)
          .json(response.response200(GET_USER_POST_SUCCESS, userPost));
      }
      return res.status(400).json(response.response400(GET_POST_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

postRouter.get(
  '/category/:id',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number().greater(0),
      limit: Joi.number().greater(0),
    },
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryId: number = parseInt(req.params.id, 10);
    const { page, limit } = req.query as any;
    try {
      const categoryPost = await getPostByCategoryId(categoryId, page, limit);
      if (categoryPost) {
        return res
          .status(200)
          .json(
            response.response200(GET_POST_BY_CATEGORY_SUCCESS, categoryPost),
          );
      }
      return res.status(400).json(response.response400(GET_POST_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

postRouter.get(
  '/category/all/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categoryId: number = parseInt(req.params.id, 10);
      const nestedId = await getNestedCategories(categoryId);
      const nestedIdArr = Object.values(nestedId as Object);
      const nestedIdMap = nestedIdArr.map((getid) => getid.id);
      const result = await Promise.all(
        nestedIdMap.map((v) => {
          const getpost = getPostByCategoryId(v);
          return getpost;
        }),
      );
      if (result) {
        return res
          .status(200)
          .json(response.response200(GET_POST_BY_NESTED_SUCCESS, result));
      }
      return res.status(400).json(response.response400(GET_POST_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

postRouter.delete(
  '/:id',
  checkJWT,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const postid: number = parseInt(req.params.id, 10);
    try {
      const deletedPost = await deletePost(postid);
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

postRouter.put(
  '/:id',
  checkJWT,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      is_public: Joi.boolean().required(),
      category_id: Joi.number().required(),
    }),
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const postid = parseInt(req.params.id, 10);
    try {
      const editpost = await editPost(req.body as IPostdetail, postid);
      if (editpost) {
        return res
          .status(200)
          .json(response.response200(EDIT_SUCCESS, editpost));
      }
      return res.status(400).json(response.response400(EDIT_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);
export default postRouter;
