import config from '../../config';
import { Student } from '../student/student.interface';
import { TNewUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, student: Student) => {
  const user: TNewUser = {};

  // is password is not given use a default password
  user.password = password || (config.default_Password as string);

  // set a role to user
  user.role = 'student';

  // set manually generated id
  user.id = '203010001';

  const result = await User.create(user);

  if (Object.keys(student).length) {
    // set id and _id as user
    student.id = result.id;
    student.user = result._id;
  }
  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
