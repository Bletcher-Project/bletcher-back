import Post from '../models/post';
import User from '../models/user';
import Image from '../models/image';
import Category from '../models/category';
import { IPostdetail } from '../interfaces/post';

export const createPost = async (postInfo: IPostdetail): Promise<Post | null> => {
  const post = await Post.create({
    title: postInfo.title,
    description: postInfo.description,
    is_public: postInfo.is_public,
    user_id: postInfo.user_id,
    category_id: postInfo.category_id,
    image_id: postInfo.image_id,
  });
  const postid = await Post.findOne({
    where: { id: post.id },
    attributes: ['id'],
  });
  return postid;
};

export const getPost = async (page: number = 1, limit: number = 10): Promise<Post[] | null> => {
  const offset = limit * (page - 1);
  const allPost = await Post.findAll({
    attributes: ['id', 'title', 'description', 'is_public', 'created_at', 'updated_at'],
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
      {
        model: Image,
        attributes: ['id', 'path'],
      },
    ],
    offset,
    limit,
    order: [['created_at', 'DESC']],
  });
  return allPost;
};

export const getPostByPostId = async (id: number): Promise<Post | null> => {
  const post = await Post.findOne({
    attributes: ['id', 'title', 'description', 'is_public', 'created_at', 'updated_at', 'user_id'],
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
      {
        model: Image,
        attributes: ['id', 'path'],
      },
    ],
    where: { id },
  });
  return post;
};

export const getPostByUserId = async (
  userid: number,
  page: number = 1,
  limit: number = 10,
): Promise<Post[] | null> => {
  const offset = limit * (page - 1);
  const post = await Post.findAll({
    attributes: ['id', 'title', 'description', 'is_public', 'created_at', 'updated_at'],
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
      {
        model: Image,
        attributes: ['id', 'path'],
      },
    ],
    offset,
    limit,
    order: [['created_at', 'DESC']],
    where: {
      user_id: userid,
    },
  });
  return post;
};

export const getPostByCategoryId = async (
  category_id: number,
  page: number = 1,
  limit: number = 10,
): Promise<Post[]> => {
  const offset = limit * (page - 1);
  const post = await Post.findAll({
    attributes: ['id', 'title', 'description', 'is_public', 'created_at', 'updated_at'],
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
      },
      {
        model: Category,
        attributes: ['id', 'name'],
      },
      {
        model: Image,
        attributes: ['id', 'path'],
      },
    ],
    offset,
    limit,
    order: [['created_at', 'DESC']],
    where: {
      category_id,
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
