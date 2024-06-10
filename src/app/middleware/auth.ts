import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...RequiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check if the token is come from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Unauthorized');
    }

    // check if the token is valid
    jwt.verify(token, config.jwt_secret as string, function (err, decoded) {
      // err
      if (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Unauthorized');
      }

      const role = (decoded as JwtPayload).role;

      if (RequiredRole && !RequiredRole.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized😈');
      }
      // decoded
      req.user = decoded as JwtPayload;
      next();
    });
  });
};

export default auth;
