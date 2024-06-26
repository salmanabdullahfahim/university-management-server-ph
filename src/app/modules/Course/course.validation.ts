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
    isDeleted: z.boolean().optional(),
    prerequisiteCourses: z
      .array(prerequisiteCoursesValidationSchema)
      .optional(),
  }),
});

const updatePrerequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    prerequisiteCourses: z
      .array(updatePrerequisiteCoursesValidationSchema)
      .optional(),
  }),
});

const facultiesToCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesToCourseValidationSchema,
};
