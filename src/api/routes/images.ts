import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { uploadPost, uploadProfile } from '../middleware/multer';
import Logger from '../../loaders/logger';
import checkJWT from '../middleware/checkJwt';
import {
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  GET_IMAGE_SUCCESS,
  GET_IMAGE_FAIL,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAIL,
} from '../../util/response/message';
import response from '../../util/response';
import { postImage, getImage, deleteImage } from '../../services/image';
import { IImageDetail } from '../../interfaces/image';

const imageRouter = Router();

imageRouter.post(
  '/posts',
  checkJWT,
  uploadPost,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const detail = {
        name: req.file.filename,
        type: req.file.mimetype,
        path: req.file.path,
      };
      const newimage = await postImage(detail as IImageDetail);
      if (newimage) {
        return res
          .status(200)
          .json(response.response200(IMAGE_UPLOAD_SUCCESS, newimage));
      }
      return res.status(400).json(response.response400(IMAGE_UPLOAD_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

imageRouter.post(
  '/profiles',
  checkJWT,
  uploadProfile,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const detail = {
        name: req.file.filename,
        type: req.file.mimetype,
        path: req.file.path,
      };
      const newimage = await postImage(detail as IImageDetail);
      if (newimage) {
        return res
          .status(200)
          .json(response.response200(IMAGE_UPLOAD_SUCCESS, newimage));
      }
      return res.status(400).json(response.response400(IMAGE_UPLOAD_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

imageRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required().greater(0),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const imageid: number = parseInt(req.params.id, 10);
    try {
      const imagepath = await getImage(imageid);
      if (imagepath) {
        return res
          .status(200)
          .json(response.response200(GET_IMAGE_SUCCESS, imagepath));
      }
      return res.status(400).json(response.response400(GET_IMAGE_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

imageRouter.delete(
  '/:id',
  checkJWT,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  async (req: Request, res: Response, next: NextFunction) => {
    const imageid: number = parseInt(req.params.id, 10);
    try {
      const deletedImage = await deleteImage(imageid);
      if (deletedImage) {
        return res
          .status(200)
          .json(response.response200(DELETE_IMAGE_SUCCESS, deletedImage));
      }
      return res.status(400).json(response.response400(DELETE_IMAGE_FAIL));
    } catch (err) {
      Logger.error('🔥 error %o', err);
      return next(err);
    }
  },
);

export default imageRouter;
