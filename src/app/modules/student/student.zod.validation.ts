import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First name can not exceed 20 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must be capitalized',
      },
    ),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().min(1, 'Last name is required'),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNumber: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNumber: z.string().min(1, "Mother's contact number is required"),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNumber: z
    .string()
    .min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      contactNumber: z.string().min(1, 'Contact number is required'),
      emergencyContactNumber: z
        .string()
        .min(1, 'Emergency contact number is required'),
      email: z.string().email('Invalid email format'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

// Export the Zod schema
export const studentValidations = {
  createStudentValidationSchema,
};
