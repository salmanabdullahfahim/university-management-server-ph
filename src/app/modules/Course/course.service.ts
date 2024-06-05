import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

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

  // step-01 basic filed update
  const basicUpdate = await Course.findByIdAndUpdate(id, remainingCourseInfo, {
    new: true,
    runValidators: true,
  });

  // check if there is any prerequisite course to update
  if (prerequisiteCourses && prerequisiteCourses.length > 0) {
    // filter out the delete field
    const deletedPrerequisite = prerequisiteCourses
      .filter((elem) => elem.course && elem.isDeleted)
      .map((elem) => elem.course);

    const deletedPrerequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { prerequisiteCourses: { course: { $in: deletedPrerequisite } } },
    });
  }

  return basicUpdate;
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
};
