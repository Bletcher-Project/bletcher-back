import Mix from '../models/mix';
import { IMixInfo, IPostdetail } from '../interfaces/post';
import { createPost } from './post';

export const checkMixExists = async (params: IMixInfo): Promise<boolean> => {
  const mix: Mix | null = await Mix.findOne({
    where: { origin_post_id: params.origin_post_id, sub_post_id: params.sub_post_id },
  });
  return mix != null;
};

export const addMix = async (params: IMixInfo): Promise<void> => {
  const newpostinfo = {
    title: 'mixedting',
    description: 'no desc',
    is_public: true,
    user_id: 1,
    category_id: 1,
    image_id: 2,
  };
  const mixedPostId = await createPost(newpostinfo as IPostdetail);
  await Mix.create({
    origin_post_id: params.origin_post_id,
    sub_post_id: params.sub_post_id,
    post_id: mixedPostId?.getDataValue('id'),
  });
};
