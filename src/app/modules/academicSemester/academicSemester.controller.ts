import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemseter.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemestersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semesters retrieved successfully',
    data: result,
  });
});

const getAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await AcademicSemesterServices.getAcademicSemesterFromDB(semesterId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester retrieved successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester updated successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemesters,
  getAcademicSemester,
  updateAcademicSemester,
};
