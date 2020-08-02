import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import jwtKey from '../../config';
import { IJwtRequest } from '../../interfaces/auth';
import { AUTH_FAIL } from '../../util/response/message';
import response from '../../util/response';

const checkJWT = (req: IJwtRequest, res: Response, next: NextFunction) => {
  const token = <string>req.headers['x-access-token'];

  if (!token) {
    res.status(401).json(response.response401(AUTH_FAIL));
  } else {
    jwt.verify(token, jwtKey.toString(), (error, decoded) => {
      if (error) {
        res.status(403).json(response.response403(AUTH_FAIL, error.message));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

export default checkJWT;
