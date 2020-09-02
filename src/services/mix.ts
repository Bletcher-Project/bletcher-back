import Mix from '../models/mix';
import { IMixInfo, IPostdetail } from '../interfaces/post';
import { createPost, getPostByPostId } from './post';

export const checkMixExists = async (params: IMixInfo): Promise<boolean> => {
  const mix: Mix | null = await Mix.findOne({
    where: { origin_post_id: params.origin_post_id, sub_post_id: params.sub_post_id },
  });
  return mix != null;
};

export const addMix = async (params: IMixInfo): Promise<void> => {
  const samplePost = await getPostByPostId(params.origin_post_id);
  // const mixImage = samplePost?.get('image_id');
  const mixUserId = await getPostByPostId(params.origin_post_id);
  const newpostinfo = {
    title: 'mixedting',
    description: 'no desc',
    is_public: true,
    user_id: mixUserId?.getDataValue('user_id'),
    category_id: 1,
    image_id: samplePost?.getDataValue('image_id'),
  };
  const mixedPostId = await createPost(newpostinfo as IPostdetail);
  await Mix.create({
    origin_post_id: params.origin_post_id,
    sub_post_id: params.sub_post_id,
    post_id: mixedPostId?.getDataValue('id'),
  });
};

export const getOriginMixInfo = async (id: number): Promise<Mix[] | null> => {
  const mix = await Mix.findAll({ where: { origin_post_id: id } });
  return mix;
};

export const getSubMixInfo = async (id: number): Promise<Mix[] | null> => {
  const mix = await Mix.findAll({ where: { sub_post_id: id } });
  return mix;
};
