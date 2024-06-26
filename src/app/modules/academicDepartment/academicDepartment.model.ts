import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// check if academic department is already exist
academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic department already exist',
    );
  }
  next();
});

// check if academic department is already exist for update
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isExist = await AcademicDepartment.findOne(query);

  if (!isExist) {
    throw new AppError(404, 'Academic department not found');
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
