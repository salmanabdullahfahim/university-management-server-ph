import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course created successfully!',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course retrieved successfully!',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course retrieved successfully!',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully!',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course deleted successfully!',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
