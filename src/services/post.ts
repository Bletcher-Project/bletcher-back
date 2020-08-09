import Post from '../models/post';
import { IPostdetail } from '../interfaces/post';

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
    order: [['created_at', 'DESC']],
  });
  return allPost;
};

export const getPostPages = async (
  page: number,
  limit: number,
): Promise<Post[]> => {
  let offset = 0;
  if (page > 1) {
    offset = limit * (page - 1);
  }
  const pagePost = await Post.findAll({
    offset,
    limit,
    order: [['created_at', 'DESC']],
  });
  return pagePost;
};

export const getPostByPostId = async (id: number): Promise<Post | null> => {
  const post = await Post.findOne({
    where: { id },
  });
  return post;
};

export const getPostByUserId = async (
  userid: number,
): Promise<Post[] | null> => {
  const post = await Post.findAll({
    where: {
      user_id: userid,
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
): Promise<[number, Post[]] | null> => {
  const existpost = await Post.findByPk(id);
  if (!existpost) {
    return null;
  }
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
