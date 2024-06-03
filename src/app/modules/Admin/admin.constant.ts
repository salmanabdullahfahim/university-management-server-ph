import { TBloodGroup, TGender } from './admin.interface';

export const Gender: TGender[] = ['male', 'female', 'other'];
export const BloodGroup: TBloodGroup[] = [
  'A+',
  'B+',
  'AB+',
  'O+',
  'A-',
  'B-',
  'AB-',
  'O-',
];

export const AdminSearchableFields = [
  'email',
  'id',
  'contactNumber',
  'emergencyContactNumber',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
