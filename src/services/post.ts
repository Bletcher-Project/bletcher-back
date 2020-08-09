import Post from '../models/post';
import { IPostInfo, IPostdetail } from '../interfaces/post';

export const createPost = async (postInfo: IPostdetail): Promise<void> => {
  await Post.create({
    title: postInfo.title,
    description: postInfo.description,
    is_public: postInfo.is_public,
    user_id: postInfo.user_id,
    category_id: postInfo.category_id,
  });
};

export const getAllPost = async (): Promise<Post[] | null> => {
  const allPost = await Post.findAll({
    offset: 0,
    limit: 100,
    order: [['created_at', 'DESC']],
  });
  return allPost;
};

export const getPostByPostId = async (
  postInfo: IPostInfo,
): Promise<Post | null> => {
  const post = await Post.findOne({
    where: {
      id: postInfo.postid || null,
    },
  });
  return post;
};

export const getPostByUserId = async (
  postInfo: IPostInfo,
): Promise<Post[] | null> => {
  const post = await Post.findAll({
    where: {
      user_id: postInfo.userid || null,
    },
  });
  return post;
};

export const deletePost = async (id: number): Promise<number> => {
  const post = await Post.destroy({
    where: { id },
  });
  return post;
};

export const editPost = async (
  postInfo: IPostdetail,
  id: number,
): Promise<[number, Post[]]> => {
  const post = await Post.update(
    {
      title: postInfo.title,
      description: postInfo.description,
      is_public: postInfo.is_public,
      category_id: postInfo.category_id,
    },
    { where: { id } },
  );
  return post;
};
