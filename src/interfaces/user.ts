export interface IUser {
  id: number;
  email: string;
  user_id: string;
  password: string;
  introduce?: string;
  profile_image?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IUserforSignUp {
  email: string;
  user_id: string;
  password: string;
}

export interface IUserInfo {
  id?: string;
  email?: string;
  userId?: string;
}

export interface IUserforModify {
  id: number;
  email: string;
  user_id: string;
  password: string;
  introduce?: string;
  profile_image?: string;
}
