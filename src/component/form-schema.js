import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  // Student Information
  studentName: yup
    .string()
    .required('Student name is required')
    .matches(/^[A-Z\s]+$/, 'Name must be in CAPITAL LETTERS only'),

  gender: yup.string().required('Gender is required'),

  studentBForm: yup
    .string()
    .required('Student B-Form is required')
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'B-Form must be in format: 00000-0000000-0'),

  dobDay: yup
    .number()
    .required('Day is required')
    .min(1, 'Invalid day')
    .max(31, 'Invalid day'),

  dobMonth: yup.string().required('Month is required'),
  
  dobYear: yup
    .number()
    .required('Year is required')
    .min(2012, 'Age should not exceed eleven years')
    .max(2018, 'Invalid year'),
  religion: yup.string().required('Religion is required'),
  
  // Father/Guardian Information
  fatherName: yup.string().required("Father's name is required"),
  fatherCNIC: yup
    .string()
    .required("Father's CNIC is required")
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in format: 00000-0000000-0'),
  domicileDistrict: yup.string().required('District of Domicile is required'),
  guardianName: yup.string(),
  guardianContact: yup
    .string()
    .matches(/^(\+92|0)?3\d{9}$/, 'Invalid contact number'),
  contact1: yup
    .string()
    .required('At least one contact number is required')
    .matches(/^(\+92|0)?3\d{9}$/, 'Invalid contact number'),
  contact2: yup
    .string()
    .matches(/^(\+92|0)?3\d{9}$/, 'Invalid contact number'),
  
  // Address Information
  postalAddress: yup.string().required('Postal address is required'),
  city: yup.string().required('City is required'),
  district: yup.string().required('District is required'),
  
  // Previous School Information
  schoolName: yup.string().required('School name is required'),
  schoolCategory: yup.string().required('School category is required'),
  schoolSemisCode: yup.string().required('School SEMIS/Code is required'),
  studyingInClass: yup.string().required('Current class is required'),
  enrollmentYear: yup
    .number()
    .required('Year of enrollment is required')
    .min(2018, 'Invalid year')
    .max(2024, 'Invalid year'),
  schoolGRNo: yup.string().required('School GR No is required'),
  headmasterName: yup.string().required('Headmaster/Headmistress name is required'),
  headmasterContact: yup
    .string()
    .required('Headmaster contact is required')
    .matches(/^(\+92|0)?3\d{9}$/, 'Invalid contact number'),
  
  // Entry Test Preference
  testMedium: yup.string().required('Medium of instruction is required'),
  division: yup.string().required('Division is required'),
  
  // Acknowledgment
  acknowledgment: yup
    .boolean()
    .oneOf([true], 'You must acknowledge the terms and conditions'),
});