import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import jwtKey from '../../config';
import { IJwtRequest } from '../../interfaces/auth';
import { AUTH_FAIL } from '../../constants/responseMessage';

const checkJWT = (req: IJwtRequest, res: Response, next: NextFunction) => {
  const token = <string>req.headers['x-access-token'];

  if (!token) {
    res.status(401).json({
      status: '401 Unauthorized',
      message: AUTH_FAIL,
    });
  } else {
    jwt.verify(token, jwtKey.toString(), (error, decoded) => {
      if (error) {
        res.status(403).json({
          status: '403 Forbidden',
          message: AUTH_FAIL,
          error: error.message,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

export default checkJWT;
