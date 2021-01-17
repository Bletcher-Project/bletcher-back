import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import checkJWT from '../middleware/checkJwt';
import { IJwtRequest } from '../../interfaces/auth';
import { IMixInfo } from '../../interfaces/post';
import { getPostByPostId, deletePost } from '../../services/post';
import {
  checkMixExists,
  postMix,
  getOriginMixInfo,
  getSubMixInfo,
  deleteMix,
} from '../../services/mix';
import {
  POST_NOT_EXISTS,
  MIX_SUCCESS,
  ALREADY_MIXED,
  GET_MIX_INFO_SUCCESS,
  GET_MIX_INFO_FAIL,
  DELETE_MIX_SUCCESS,
  DELETE_POST_FAIL,
  NO_MIX_EXIST,
  MIX_FAIL,
} from '../../util/response/message';
import response from '../../util/response';

const mixRouter = Router();

mixRouter.post(
  '/:originid/:subid',
  checkJWT,
  celebrate({
    [Segments.PARAMS]: {
      originid: Joi.number().integer().required(),
      subid: Joi.number().integer().required(),
    },
  }),
  async (req: IJwtRequest, res: Response, next: NextFunction) => {
    const originPostId: number = parseInt(req.params.originid, 10);
    const subPostId: number = parseInt(req.params.subid, 10);
    try {
      const originPost = await getPostByPostId(originPostId);
      const subPost = await getPostByPostId(subPostId);
      if (!originPost || !subPost) {
        return res.status(400).json(response.response400(POST_NOT_EXISTS));
      }
      const mixDetail = { origin_post_id: originPost.id, sub_post_id: subPost.id };
      if (await checkMixExists(mixDetail as IMixInfo)) {
        return res.status(409).json(response.response409(ALREADY_MIXED));
      }
      const newmix = await postMix(mixDetail as IMixInfo);
      if (newmix) {
        return res.status(200).json(response.response200(MIX_SUCCESS, newmix));
      }
      return res.status(500).json(response.response500(MIX_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

mixRouter.get(
  '/origin/:id',
  checkJWT,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const postid: number = parseInt(req.params.id, 10);
    try {
      const mixinfo = await getOriginMixInfo(postid);
      if (mixinfo) {
        return res.status(200).json(response.response200(GET_MIX_INFO_SUCCESS, mixinfo));
      }
      return res.status(400).json(response.response400(GET_MIX_INFO_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

mixRouter.get(
  '/sub/:id',
  checkJWT,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const postid: number = parseInt(req.params.id, 10);
    try {
      const mixinfo = await getSubMixInfo(postid);
      if (mixinfo) {
        return res.status(200).json(response.response200(GET_MIX_INFO_SUCCESS, mixinfo));
      }
      return res.status(400).json(response.response400(GET_MIX_INFO_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

mixRouter.delete(
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
      const deletedMix = await deleteMix(postid);
      if (!deletedMix) {
        return res.status(400).json(response.response400(NO_MIX_EXIST));
      }
      const deletedPost = await deletePost(postid);
      if (!deletedPost) {
        return res.status(400).json(response.response400(DELETE_POST_FAIL));
      }
      return res.status(200).json(response.response200(DELETE_MIX_SUCCESS, deletedMix));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

export default mixRouter;
