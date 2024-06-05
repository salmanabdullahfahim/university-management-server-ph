import { Schema, model } from 'mongoose';
import {
  TAssignFaculty,
  TCourse,
  TPrerequisiteCourses,
} from './course.interface';

const prerequisiteCourseSchema = new Schema<TPrerequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  credits: {
    type: Number,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  prerequisiteCourses: [prerequisiteCourseSchema],
});

export const Course = model<TCourse>('Course', courseSchema);

const assignFacultyToCourseSchema = new Schema<TAssignFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});
export const AssignFacultiesToCourse = model(
  'AssignFacultiesToCourse',
  assignFacultyToCourseSchema,
);
