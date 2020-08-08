export interface IPostdetail {
  title: string;
  description: string;
  is_public: boolean;
  user_id: number;
  category_id: number;
}

export interface IPostInfo {
  userid?: number;
  postid?: number;
}
