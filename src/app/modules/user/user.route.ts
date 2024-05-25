import express from 'express';
import { UserControllers } from './user.controller';

import { studentValidations } from '../student/student.zod.validation';
import validateRequest from '../../utils/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const userRoutes = router;
