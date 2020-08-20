import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import {
  getAllCategories,
  getGroupCategories,
  getNestedCategories,
} from '../../services/category';
import {
  GET_ALL_CATEGORY_SUCCESS,
  GET_GROUP_CATEGORY_SUCCESS,
  GET_NESTED_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
} from '../../util/response/message';
import response from '../../util/response';

const categoryRouter = Router();

categoryRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allcategory = await getAllCategories();
      if (allcategory) {
        return res
          .status(200)
          .json(response.response200(GET_ALL_CATEGORY_SUCCESS, allcategory));
      }
      return res.status(400).json(response.response400(GET_CATEGORY_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

categoryRouter.get(
  '/group',
  celebrate({
    [Segments.QUERY]: {
      categoryid: Joi.number().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryid } = req.query as any;
    try {
      if (categoryid) {
        const groupcategory = await getGroupCategories(categoryid);
        if (!groupcategory) {
          return res.status(400).json(response.response400(GET_CATEGORY_FAIL));
        }
        return res
          .status(200)
          .json(
            response.response200(GET_GROUP_CATEGORY_SUCCESS, groupcategory),
          );
      }
      return res.status(400).json(response.response400(GET_CATEGORY_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

categoryRouter.get(
  '/group/all',
  celebrate({
    [Segments.QUERY]: {
      categoryid: Joi.number().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryid } = req.query as any;
    try {
      if (categoryid) {
        const nestedcategories = await getNestedCategories(categoryid);
        if (!nestedcategories) {
          return res.status(400).json(response.response400(GET_CATEGORY_FAIL));
        }
        return res
          .status(200)
          .json(
            response.response200(GET_NESTED_CATEGORY_SUCCESS, nestedcategories),
          );
      }
      return res.status(400).json(response.response400(GET_CATEGORY_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

export default categoryRouter;
