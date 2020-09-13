export interface IUserforSignUp {
  email: string;
  nickname: string;
  password: string;
}

export interface IUserInfo {
  id?: string;
  email?: string;
  nickname?: string;
}

export interface IUserAction {
  user_id: number;
  post_id: number;
}
