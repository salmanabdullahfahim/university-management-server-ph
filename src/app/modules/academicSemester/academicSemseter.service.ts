import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // academic semester name ---> academic semester code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid academic semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemestersFromDB,
};
