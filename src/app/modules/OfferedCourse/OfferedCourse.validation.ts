import { z } from 'zod';
import { Days } from './OfferedCourse.constant';

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: z.string().refine(
        (time) => {
          const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message:
            'Invalid startTime format, expected "HH:MM" in 24 hour format',
        },
      ),
      endTime: z.string().refine(
        (time) => {
          const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: 'Invalid endTime format, expected "HH:MM" in 24 hour format',
        },
      ),
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}`);
        const end = new Date(`1970-01-01T${body.endTime}`);

        return start < end;
      },
      {
        message: 'Start Time Should be before End Time',
      },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
