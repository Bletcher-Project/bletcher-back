import Post from '../models/post';

export interface IPostdetail {
  title: string;
  description: string | null;
  is_public: boolean;
  user_id: number;
  image_id: number;
  category_id: number;
}

export interface IMixInfo {
  origin_post_id: number;
  sub_post_id: number;
}

export interface IPostMain {
  post: Post;
  isFavorite: boolean;
}
