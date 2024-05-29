import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department name must be a string',
      required_error: 'Academic Department name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Faculty must be a string',
      required_error: 'Academic faculty is required',
    }),
  }),
});
const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department name must be a string',
        required_error: 'Academic Department name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Faculty must be a string',
        required_error: 'Academic faculty is required',
      })
      .optional(),
  }),
});

export const AcademicFacultyValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
