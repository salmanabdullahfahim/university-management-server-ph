import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic department created successfully!',
    data: result,
  });
});

const getAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAcademicDepartmentsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic departments retrieved successfully!',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic department retrieved successfully!',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      req.body,
    );
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic department updated successfully!',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
