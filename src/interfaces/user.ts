export interface IUserforSignUp {
  email: string;
  nickname: string;
  password: string;
}

export interface IUserInfo {
  id?: number;
  email?: string;
  nickname?: string;
}

export interface IUserAction {
  user_id: number;
  post_id: number;
}

export interface IUserModify {
  id: number;
  email: string;
  nickname: string;
  password?: string;
  introduce?: string;
  profile_image?: number;
}
