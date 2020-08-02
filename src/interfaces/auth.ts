import { Request } from 'express';

export interface IAuthUser {
  id: string;
  password: string;
}

interface IJwtInfo {
  id?: number;
  email?: string;
  iat?: number;
  exp?: number;
  iss?: string;
  sub?: string;
}

export interface IJwtRequest extends Request {
  decoded?: IJwtInfo;
}
