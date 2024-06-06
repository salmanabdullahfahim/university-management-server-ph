import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    status: z.enum([...SemesterRegistrationStatus] as [string, ...string[]]),
    startDate: z.string().date(),
    endDate: z.string().date(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

export const semesterRegistrationValidations = {
  semesterRegistrationValidationSchema,
};
