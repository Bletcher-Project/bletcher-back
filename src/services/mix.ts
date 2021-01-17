import rp from 'request-promise';
import Image from '../models/image';
import Post from '../models/post';
import Mix from '../models/mix';
import { IMixInfo, IPostdetail } from '../interfaces/post';
import calcUtil from '../util/calc';
import { IImageDetail } from '../interfaces/image';
import { postImage } from './image';
import { createPost, getPostByPostId } from './post';
import Logger from '../loaders/logger';

export const checkMixExists = async (params: IMixInfo): Promise<boolean> => {
  const mix: Mix | null = await Mix.findOne({
    where: { origin_post_id: params.origin_post_id, sub_post_id: params.sub_post_id },
  });
  return mix != null;
};

export const postMix = async (params: IMixInfo): Promise<boolean> => {
  const sampleOriginPost: any = await getPostByPostId(params.origin_post_id);
  const sampleSubPost: any = await getPostByPostId(params.sub_post_id);
  const originImagePath = sampleOriginPost['Image.path'];
  const subImagePath = sampleSubPost['Image.path'];
  let mixSuccess = false;

  await rp({
    url: 'http://bletcher-mix.herokuapp.com/synthesizing',
    method: 'POST',
    timeout: 180000,
    followRedirect: true,
    maxRedirects: 10,
    simple: false,
    form: {
      content_image_path: originImagePath,
      style_image_path: subImagePath,
      mix_image_name: new Date().valueOf() + calcUtil.getNand(10),
    },
  })
    .then(async (body) => {
      const jsonBody = JSON.parse(body);
      const newImageInfo = {
        name: `post/mix/${jsonBody.name}`,
        type: jsonBody.type,
        path: jsonBody.path,
      };
      const mixedImage: Image | null = await postImage(newImageInfo as IImageDetail);
      if (mixedImage) {
        const mixTitle = `${sampleOriginPost['User.nickname']} X ${sampleSubPost['User.nickname']}`;
        const newPostInfo = {
          title: mixTitle,
          description: null,
          is_public: true,
          user_id: sampleOriginPost['User.id'],
          category_id: 1,
          image_id: mixedImage?.id,
        };
        const mixedPost: Post | null = await createPost(newPostInfo as IPostdetail);
        if (mixedPost) {
          await Mix.create({
            origin_post_id: params.origin_post_id,
            sub_post_id: params.sub_post_id,
            post_id: mixedPost?.id,
          });
        }
        if (jsonBody.error === 0) {
          mixSuccess = true;
        }
      }
    })
    .catch((err) => {
      Logger.error('🔥 error %o', err.message);
    });
  return mixSuccess;
};

export const getOriginMixInfo = async (id: number): Promise<Mix[] | null> => {
  const mix = await Mix.findAll({ where: { origin_post_id: id } });
  return mix;
};

export const getSubMixInfo = async (id: number): Promise<Mix[] | null> => {
  const mix = await Mix.findAll({ where: { sub_post_id: id } });
  return mix;
};

export const deleteMix = async (id: number): Promise<number> => {
  const mix = await Mix.destroy({
    where: { post_id: id },
  });
  return mix;
};
