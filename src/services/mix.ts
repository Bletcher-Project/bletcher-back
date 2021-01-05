import rp from 'request-promise';
import Mix from '../models/mix';
import { IMixInfo, IPostdetail } from '../interfaces/post';
import { createPost, getPostByPostId } from './post';
import calcUtil from '../util/calc';

export const checkMixExists = async (params: IMixInfo): Promise<boolean> => {
  const mix: Mix | null = await Mix.findOne({
    where: { origin_post_id: params.origin_post_id, sub_post_id: params.sub_post_id },
  });
  return mix != null;
};

export const postMix = async (params: IMixInfo): Promise<void> => {
  const sampleOriginPost: any = await getPostByPostId(params.origin_post_id);
  const sampleSubPost: any = await getPostByPostId(params.sub_post_id);
  if (sampleOriginPost && sampleSubPost) {
    const originImagePath = sampleOriginPost['Image.path'];
    const subImagePath = sampleSubPost['Image.path'];
    rp(
      {
        url: 'http://localhost:8000/synthesizing', // http://bletcher-mix.herokuapp.com/synthesizing
        method: 'POST',
        timeout: 500000000, // timeout >= mixing time
        followRedirect: true,
        maxRedirects: 10,
        resolveWithFullResponse: true,
        simple: false,
        form: {
          content_image_path: originImagePath,
          style_image_path: subImagePath,
          mix_image_name: new Date().valueOf() + calcUtil.getNand(10),
        },
      },
      (error, response, body) => {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
      },
    );

    const mixTitle = `${sampleOriginPost['User.nickname']} X ${sampleSubPost['User.nickname']}`;
    // const newImageInfo = {
    //   name:
    //   type:
    //   path:
    // };
    const newPostInfo = {
      title: mixTitle,
      description: null,
      is_public: true,
      user_id: sampleOriginPost['User.id'],
      category_id: 1,
      image_id: sampleOriginPost['Image.id'],
      /* image_id will come from getImageFromAI */
    };
    // const mixedImage = await postImage(newImageInfo as IImageDetail);
    const mixedPost = await createPost(newPostInfo as IPostdetail);
    await Mix.create({
      origin_post_id: params.origin_post_id,
      sub_post_id: params.sub_post_id,
      post_id: mixedPost?.getDataValue('id'),
    });
  }
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
