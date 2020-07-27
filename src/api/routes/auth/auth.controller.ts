import { Request, Response, NextFunction } from 'express';
import { IJsonWebTokenRequest } from '../../../interfaces/auth';
import { authenticate, authorize, getUser } from '../../../services/auth';

export const postSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id, password } = req.body;

  try {
    const user = await authenticate(id, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await authorize(user);
    return res.status(200).send({ user, token });
  } catch (error) {
    return next(error);
  }
};

export const getUserInfo = async (
  req: IJsonWebTokenRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userInfo = getUser(req.decoded?.id);
    return res.status(200).send({ userInfo });
  } catch (error) {
    return next(error);
  }
};

/*
  Check user status with JWT token
  GET /api/auth/check
*/
export const check = (req: IJsonWebTokenRequest, res: Response) => {
  res.json({
    success: true,
    info: req.decoded,
  });
};
