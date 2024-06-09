import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload?.id);
  //  check if the user exists
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the user is deleted
  // const isDeleted = isUserExists?.isDeleted;
  // if (isDeleted) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted');
  // }

  // check if the user is blocked
  // const isBlocked = isUserExists?.status === 'blocked';
  // if (isBlocked) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  // }

  // check if the password is matched

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is not matched');
  }
};

export const AuthServices = {
  loginUser,
};
