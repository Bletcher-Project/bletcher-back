import rp from 'request-promise';
import Post from '../models/post';
import Mix from '../models/mix';
import { IMixInfo, IPostdetail } from '../interfaces/post';
import { IImageDetail } from '../interfaces/image';
import { postImage } from './image';
import { createPost, getPostByPostId } from './post';
import calcUtil from '../util/calc';
import Logger from '../loaders/logger';
import { SERVER_URL, MIX_API } from '../util/mix-api';
import { addFundingPost } from './funding';

export const checkMixExists = async (params: IMixInfo): Promise<boolean> => {
  const mix: Mix | null = await Mix.findOne({
    where: { origin_post_id: params.origin_post_id, sub_post_id: params.sub_post_id },
  });
  return mix != null;
};

export const postMix = async (params: IMixInfo): Promise<number | null> => {
  const sampleOriginPost: any = await getPostByPostId(params.origin_post_id);
  const sampleSubPost: any = await getPostByPostId(params.sub_post_id);
  const originImagePath = sampleOriginPost['Image.path'];
  const subImagePath = sampleSubPost['Image.path'];
  let mixImageId: number | null;

  await rp({
    url: `${SERVER_URL}${MIX_API}`,
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
      const mixImage = await postImage(newImageInfo as IImageDetail);
      mixImageId = mixImage?.id!;
    })
    .catch((err) => {
      Logger.error('🔥 error %o', err.message);
    });
  return mixImageId!;
};

export const postMixPost = async (params: IMixInfo): Promise<Post | null> => {
  const sampleOriginPost: any = await getPostByPostId(params.origin_post_id);
  const sampleSubPost: any = await getPostByPostId(params.sub_post_id);
  const mixTitle = `${sampleOriginPost['User.nickname']} X ${sampleSubPost['User.nickname']}`;
  const newPostInfo = {
    title: mixTitle,
    description: null,
    is_public: params.is_public,
    user_id: sampleOriginPost['User.id'],
    category_id: 1,
    image_id: params.image_id,
  };

  const mixedPost: Post | null = await createPost(newPostInfo as IPostdetail);
  if (mixedPost) {
    await Mix.create({
      origin_post_id: params.origin_post_id,
      sub_post_id: params.sub_post_id,
      post_id: mixedPost?.id,
    });
    if (newPostInfo.is_public === true) {
      await addFundingPost(mixedPost.id);
    }
  }

  return mixedPost;
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
