import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import jwtKey from '../../config';
import { IJsonWebTokenRequest } from '../../interfaces/auth';

const checkJWT = (
  req: IJsonWebTokenRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = <string>req.headers['x-access-token'];

  if (!token) {
    res.status(403).json({
      success: false,
      message: 'not logged in',
    });
  } else {
    jwt.verify(token, jwtKey.toString(), (error, decoded) => {
      if (error) {
        res.status(403).json({
          success: false,
          message: error.message,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

export default checkJWT;
