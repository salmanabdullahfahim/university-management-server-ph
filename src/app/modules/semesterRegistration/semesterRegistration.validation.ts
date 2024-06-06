import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...SemesterRegistrationStatus] as [string, ...string[]]),
    startDate: z.string().date(),
    endDate: z.string().date(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});
const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string().optional(),
    status: z
      .enum([...SemesterRegistrationStatus] as [string, ...string[]])
      .optional(),
    startDate: z.string().date().optional(),
    endDate: z.string().date().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const semesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
};
