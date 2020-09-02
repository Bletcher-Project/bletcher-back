import Mix from '../models/mix';
import { IMixInfo, IPostdetail } from '../interfaces/post';
import { createPost, getPostByPostId } from './post';
import { getUsernameById } from './user';

export const checkMixExists = async (params: IMixInfo): Promise<boolean> => {
  const mix: Mix | null = await Mix.findOne({
    where: { origin_post_id: params.origin_post_id, sub_post_id: params.sub_post_id },
  });
  return mix != null;
};

export const addMix = async (params: IMixInfo): Promise<void> => {
  const sampleOriginPost = await getPostByPostId(params.origin_post_id);
  const sampleSubPost = await getPostByPostId(params.sub_post_id);
  /* image will come from AI, like getImageFromAI method */

  const originUserId = await sampleOriginPost?.getDataValue('user_id');
  const subUserId = await sampleSubPost?.getDataValue('user_id');

  const originUserName = await getUsernameById(originUserId as number);
  const subUserName = await getUsernameById(subUserId as number);

  const mixTitle = `${originUserName!.nickname} X ${subUserName!.nickname}`;

  const newpostinfo = {
    title: mixTitle, // origin-postname X sub-postname
    description: 'no desc', // null
    is_public: true,
    user_id: sampleOriginPost?.getDataValue('user_id'), // origin-postname
    category_id: 1, // will be changed to 'mix' category
    image_id: sampleOriginPost?.getDataValue('image_id'),
  };
  const mixedPost = await createPost(newpostinfo as IPostdetail);
  await Mix.create({
    origin_post_id: params.origin_post_id,
    sub_post_id: params.sub_post_id,
    post_id: mixedPost?.getDataValue('id'),
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

export const deleteMix = async (id: number): Promise<number> => {
  const mix = await Mix.destroy({
    where: { post_id: id },
  });
  return mix;
};
