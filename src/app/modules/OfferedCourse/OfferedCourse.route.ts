import express from 'express';
import { OfferedCourseController } from './OfferedCourse.controller';
import validateRequest from '../../utils/validateRequest';
import { OfferedCourseValidations } from './OfferedCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.patch('/:id', OfferedCourseController.updateOfferedCourse);

export const OfferedCourseRoutes = router;
