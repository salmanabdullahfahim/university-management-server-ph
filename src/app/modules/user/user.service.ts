import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Student } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, studentData: Student) => {
  const userData: Partial<TUser> = {};

  // is password is not given use a default password
  userData.password = password || (config.default_Password as string);

  // set a role to user
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  // set student id
  userData.id = generateStudentId(admissionSemester);

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
