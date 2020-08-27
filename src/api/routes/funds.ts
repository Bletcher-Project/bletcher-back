import { Router, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import Logger from '../../loaders/logger';
import checkJWT from '../middleware/checkJwt';
import { IJwtRequest } from '../../interfaces/auth';
import { IUserAction } from '../../interfaces/user';
import { getPostByPostId } from '../../services/post';
import { checkFundingExists, addFunding } from '../../services/funding';
import { POST_NOT_EXISTS, FUNDING_POST_SUCCESS, EXIST_FUNDING } from '../../util/response/message';
import response from '../../util/response';

const fundRouter = Router();

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

      await addFunding(userAction as IUserAction);
      return res.status(200).json(response.response200(FUNDING_POST_SUCCESS));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

export default fundRouter;
