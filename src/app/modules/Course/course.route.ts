import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourse);
router.get('/:id', CourseControllers.getSingleCourse);
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.assignFacultiesToCourseValidationSchema),
  CourseControllers.assignFacultiesToCourse,
);
router.delete('/:id', CourseControllers.deleteCourse);

export const CourseRoutes = router;
