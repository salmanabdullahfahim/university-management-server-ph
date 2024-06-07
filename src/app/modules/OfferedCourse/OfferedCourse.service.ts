import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const offeredCourse = await OfferedCourse.create(payload);
  return offeredCourse;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
};
