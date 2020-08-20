import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import { IPostdetail } from '../../interfaces/post';
import {
  createPost,
  getAllPost,
  getPostByPostId,
  getPostPageByUserId,
  getAllPostByUserId,
  getPostPageByCategoryId,
  getAllPostByCategoryId,
  getPostPages,
  deletePost,
  editPost,
} from '../../services/post';
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
  GET_PAGE_POST_SUCCESS,
  GET_POST_BY_CATEGORY_SUCCESS,
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
      if (!page && !limit) {
        const allPost = await getAllPost();
        return res
          .status(200)
          .json(response.response200(GET_ALL_POST_SUCCESS, allPost));
      }
      if (page && limit) {
        const pagepost = await getPostPages(page, limit);
        return res
          .status(200)
          .json(response.response200(GET_PAGE_POST_SUCCESS, pagepost));
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
      id: Joi.number(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const postid: number = parseInt(req.params.id, 10);
    try {
      if (postid) {
        const onepost = await getPostByPostId(postid);
        return res
          .status(200)
          .json(response.response200(GET_ONE_POST_SUCCESS, onepost));
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
      id: Joi.number(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const userid: number = parseInt(req.params.id, 10);
    const { page, limit } = req.query as any;
    try {
      if (!page && !limit) {
        const userpost = await getAllPostByUserId(userid);
        return res
          .status(200)
          .json(response.response200(GET_USER_POST_SUCCESS, userpost));
      }
      if (page && limit) {
        const pagepost = await getPostPageByUserId(userid, page, limit);
        return res
          .status(200)
          .json(response.response200(GET_PAGE_POST_SUCCESS, pagepost));
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
      id: Joi.number(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryid: number = parseInt(req.params.id, 10);
    const { page, limit } = req.query as any;
    try {
      if (!page && !limit) {
        const allCategoryPost = await getAllPostByCategoryId(categoryid);
        return res
          .status(200)
          .json(
            response.response200(GET_POST_BY_CATEGORY_SUCCESS, allCategoryPost),
          );
      }
      if (page && limit) {
        const pagecategorypost = await getPostPageByCategoryId(
          categoryid,
          page,
          limit,
        );
        return res
          .status(200)
          .json(
            response.response200(
              GET_POST_BY_CATEGORY_SUCCESS,
              pagecategorypost,
            ),
          );
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
