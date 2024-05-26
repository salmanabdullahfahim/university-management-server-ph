import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../utils/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';

const router = express.Router();
router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAcademicSemesters);
router.get('/:semesterId', AcademicSemesterControllers.getAcademicSemester);

export const AcademicSemesterRoutes = router;
