import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { semesterRegistrationValidations } from './semesterRegistration.validation';
import { semesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    semesterRegistrationValidations.semesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);

export const semesterRegistrationRoutes = router;
