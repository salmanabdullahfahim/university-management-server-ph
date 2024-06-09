import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  //  check if the user exists
  const isUserExists = await User.findOne({ id: payload.id });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the user is deleted
  const isDeleted = isUserExists?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted');
  }

  // check if the user is blocked
  const isBlocked = isUserExists?.status === 'blocked';
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }
};

export const AuthServices = {
  loginUser,
};
