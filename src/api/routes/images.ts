import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
// import fs from 'fs';
import { uploadPost, uploadProfile } from '../middleware/multer';
import Logger from '../../loaders/logger';
import checkJWT from '../middleware/checkJwt';
import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_LOAD_SUCCESS,
  IMAGE_LOAD_FAIL,
} from '../../util/response/message';
import response from '../../util/response';
import { postPostImage, getPostImagePath } from '../../services/image';
import { IImageDetail } from '../../interfaces/image';

const imageRouter = Router();

imageRouter.post(
  '/posts',
  checkJWT,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      img: Joi.binary(),
    }),
  }),
  uploadPost,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const detail = {
        name: req.file.filename,
        type: req.file.mimetype,
        path: req.file.path,
      };
      const newimage = await postPostImage(detail as IImageDetail);
      return res
        .status(200)
        .json(response.response200(IMAGE_UPLOAD_SUCCESS, newimage));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

imageRouter.post(
  '/profiles',
  checkJWT,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      img: Joi.binary(),
    }),
  }),
  uploadProfile,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const detail = {
        name: req.file.filename,
        type: req.file.mimetype,
        path: req.file.path,
      };
      const newimage = await postPostImage(detail as IImageDetail);
      return res
        .status(200)
        .json(response.response200(IMAGE_UPLOAD_SUCCESS, newimage));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

imageRouter.get(
  '/:imageid',
  celebrate({
    [Segments.PARAMS]: {
      imageid: Joi.number().required().greater(0),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const imageid: number = parseInt(req.params.imageid, 10);
    try {
      const imagepath = await getPostImagePath(imageid);
      if (imagepath) {
        return res
          .status(200)
          .json(response.response200(IMAGE_LOAD_SUCCESS, imagepath));
      }
      return res.status(400).json(response.response400(IMAGE_LOAD_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

export default imageRouter;
