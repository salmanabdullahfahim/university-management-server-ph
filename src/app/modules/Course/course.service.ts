import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TAssignFaculty, TCourse } from './course.interface';
import { Course } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('prerequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'prerequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { prerequisiteCourses, ...remainingCourseInfo } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // step-01 basic filed update
    const basicUpdate = await Course.findByIdAndUpdate(
      id,
      remainingCourseInfo,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!basicUpdate) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    // check if there is any prerequisite course to update
    if (prerequisiteCourses && prerequisiteCourses.length > 0) {
      // filter out the delete field
      const deletedPrerequisite = prerequisiteCourses
        .filter((elem) => elem.course && elem.isDeleted)
        .map((elem) => elem.course);

      const deletedPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            prerequisiteCourses: { course: { $in: deletedPrerequisite } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPrerequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // filter out the new field
      const newPrerequisite = prerequisiteCourses.filter(
        (elem) => elem.course && !elem.isDeleted,
      );

      const newPrerequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            prerequisiteCourses: {
              $each: newPrerequisite,
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPrerequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
      const result = await Course.findById(id).populate(
        'prerequisiteCourses.course',
      );
      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const assignFacultiesToCourseIntoDB = async (
  courseId: string,
  payload: Partial<TAssignFaculty>,
) => {
  const result = await Course.findByIdAndUpdate(
    courseId,
    {
      course: courseId,
      $addToSet: {
        faculties: {
          $each: payload,
        },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesToCourseIntoDB,
};
