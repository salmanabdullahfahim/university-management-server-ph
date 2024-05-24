import config from '../../config';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  const userData: Partial<TUser> = {};

  // is password is not given use a default password
  userData.password = password || (config.default_Password as string);

  // set a role to user
  userData.role = 'student';

  // set manually generated id
  userData.id = '203010001';

  // create a user
  const newUser = await User.create(userData);

  if (Object.keys(studentData).length) {
    // set id and _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference of user

    // create a student
    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
