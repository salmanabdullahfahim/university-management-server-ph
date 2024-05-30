import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic faculty created successfully!',
    data: result,
  });
});

const getAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAcademicFacultiesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic faculties retrieved successfully!',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic faculty retrieved successfully!',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic faculty updated successfully!',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
