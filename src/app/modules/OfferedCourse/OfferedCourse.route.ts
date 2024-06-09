import express from 'express';
import { OfferedCourseController } from './OfferedCourse.controller';
import validateRequest from '../../utils/validateRequest';
import { OfferedCourseValidations } from './OfferedCourse.validation';

const router = express.Router();

router.get('/', OfferedCourseController.getAllOfferedCourses);

router.get('/:id', OfferedCourseController.getSingleOfferedCourses);

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseController.createOfferedCourse,
);

router.delete('/:id', OfferedCourseController.deleteOfferedCourse);

router.patch('/:id', OfferedCourseController.updateOfferedCourse);

export const OfferedCourseRoutes = router;
