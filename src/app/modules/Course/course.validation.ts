import { z } from 'zod';

const prerequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string().max(20),
    code: z.number(),
    credits: z.number(),
    prerequisiteCourses: z
      .array(prerequisiteCoursesValidationSchema)
      .optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
};
