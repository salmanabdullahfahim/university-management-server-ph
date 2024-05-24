export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
};

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNumber: string;
  address: string;
};
// 1. Create an interface representing a document in MongoDB.
export type Student = {
  id: string;
  password: string;
  name: UserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  contactNumber: string;
  emergencyContactNumber: string;
  email: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};
