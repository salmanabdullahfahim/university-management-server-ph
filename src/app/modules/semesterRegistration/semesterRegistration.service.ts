import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { SemesterStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there is any academic semester that is 'UPCOMING' or 'ONGOING'

  const isAcademicSemesterUpcomingOrOngoing =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isAcademicSemesterUpcomingOrOngoing) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already an ${isAcademicSemesterUpcomingOrOngoing.status} registered semester`,
    );
  }
  // check if academic semester exist
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  // check if semester registration already exist
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Semester registration already exist',
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // check if  semester registration exist
  const isSemesterRegistrationExist = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found');
  }

  // check if registered semester is ended. if that we will not update anything
  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  const requestedSemesterStatus = payload?.status;

  if (currentSemesterStatus === SemesterStatus.ENDED) {
    throw new AppError(httpStatus.BAD_REQUEST, 'The Semester is already ended');
  }

  //  UPCOMING -> ONGOING
  //  ONGOING -> UPCOMING
  //  ONGOING -> ENDED
  if (
    currentSemesterStatus === SemesterStatus.UPCOMING &&
    requestedSemesterStatus === SemesterStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not directly update a semester from UPCOMING to ENDED',
    );
  }

  if (
    currentSemesterStatus === SemesterStatus.ONGOING &&
    requestedSemesterStatus === SemesterStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You can not directly update a semester from ONGOING to UPCOMING',
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
