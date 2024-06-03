import express from 'express';
import { UserControllers } from './user.controller';

import { studentValidations } from '../student/student.zod.validation';
import validateRequest from '../../utils/validateRequest';
import { facultyValidations } from '../Faculty/faculty.validation';
import { AdminValidations } from '../Admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const userRoutes = router;
