import { Router, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import checkJWT from '../middleware/checkJwt';
import { IJwtRequest } from '../../interfaces/auth';
import { IUserAction } from '../../interfaces/user';
import { getPostByPostId } from '../../services/post';
import {
  checkFundingExists,
  addFundingCount,
  deleteFunding,
  getFundingCount,
  getFundingDuedate,
} from '../../services/funding';
import {
  POST_NOT_EXISTS,
  FUNDING_POST_SUCCESS,
  FUNDING_DELETE_SUCCESS,
  EXIST_FUNDING,
  NOT_EXIST_FUNDING,
  GET_FUNDING_COUNT_SUCCESS,
  GET_FUNDING_COUNT_FAIL,
  GET_FUNDING_DUEDATE_SUCCESS,
  GET_FUNDING_DUEDATE_FAIL,
} from '../../util/response/message';
import response from '../../util/response';

const fundRouter = Router();

fundRouter.get(
  '/count/:postid',
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

      const fundingCount = await getFundingCount(postid);
      if (!fundingCount) {
        return res.status(400).json(response.response400(GET_FUNDING_COUNT_FAIL));
      }
      return res
        .status(200)
        .json(response.response200(GET_FUNDING_COUNT_SUCCESS, { counts: fundingCount }));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

fundRouter.get(
  '/duedate/:postid',
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
      const fundingDuedate = await getFundingDuedate(postid);
      if (!fundingDuedate) {
        return res.status(400).json(response.response400(GET_FUNDING_DUEDATE_FAIL));
      }
      return res
        .status(200)
        .json(response.response200(GET_FUNDING_DUEDATE_SUCCESS, fundingDuedate));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

fundRouter.post(
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
      if (await checkFundingExists(userAction as IUserAction)) {
        return res.status(409).json(response.response409(EXIST_FUNDING));
      }

      await addFundingCount(userAction as IUserAction);
      return res.status(200).json(response.response200(FUNDING_POST_SUCCESS));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

fundRouter.delete(
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
      if (!(await checkFundingExists(userAction as IUserAction))) {
        return res.status(409).json(response.response409(NOT_EXIST_FUNDING));
      }
      await deleteFunding(userAction as IUserAction);
      return res.status(200).json(response.response200(FUNDING_DELETE_SUCCESS));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

export default fundRouter;
