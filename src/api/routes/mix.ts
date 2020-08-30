import { Router, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import checkJWT from '../middleware/checkJwt';
import { IJwtRequest } from '../../interfaces/auth';
import { IMixInfo } from '../../interfaces/post';
import { getPostByPostId } from '../../services/post';
import { POST_NOT_EXISTS, MIX_SUCCESS, ALREADY_MIXED } from '../../util/response/message';
import response from '../../util/response';
import { checkMixExists, addMix } from '../../services/mix';

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
      const newmix = await addMix(mixDetail as IMixInfo);
      return res.status(200).json(response.response200(MIX_SUCCESS, newmix));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

export default mixRouter;
