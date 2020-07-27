import { Request } from 'express';

interface IJsonWebTokenInfo {
  id?: number;
  email?: string;
  iat?: number;
  exp?: number;
  iss?: string;
  sub?: string;
}

export interface IJsonWebTokenRequest extends Request {
  decoded?: IJsonWebTokenInfo;
}
