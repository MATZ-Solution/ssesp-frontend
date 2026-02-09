import * as yup from 'yup';



export const step1Schema = yup.object().shape({
  studentName: yup
    .string()
    .required('Student name is required')
    .matches(/^[A-Z\s]+$/, 'Name must be in CAPITAL LETTERS only'),
  gender: yup.string().required('Gender is required'),
  studentBForm: yup
    .string()
    .required('Student B-Form is required')
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'B-Form must be in format: 12345-1234567-1'),
  dob: yup.string().required('Date of birth is required'),
  religion: yup.object().required('Religion is required').nullable(),
    photo: yup
    .mixed()
    .required('Student photo is required.')
    .test('fileSize', 'File size must not exceed 5MB', (value) => {
      if (!value || !value[0]) return false;
      return value[0].size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only JPG, JPEG, PNG allowed', (value) => {
      if (!value || !value[0]) return false;
      return ['image/jpeg', 'image/jpg', 'image/png'].includes(value[0].type);
    }),
});

// Validation schema for Step 3 only
export const step3Schema = yup.object().shape({  
  postalAddress: yup.string().required('Postal address is required'),
  province: yup.object().required('Province is required').nullable(),
  district: yup.object().required('District is required').nullable(),
  city: yup.object().required('City is required').nullable(),
});

// Validation schema for Step 4 only
export const step4Schema = yup.object().shape({
schoolName: yup.string().required('School name is required'),
  schoolCategory: yup.string().required('School category is required'),
  schoolSemisCode: yup.string().required('School SEMIS/Code is required'),
  studyingInClass: yup.object().required('Current class is required').nullable(),
  enrollmentYear: yup
    .string()
    .required('Year of enrollment is required')
    .matches(/^\d{4}$/, 'Must be a 4-digit year')
    .test('valid-year', 'Year must be between 2018-2024', (value) => {
      const year = parseInt(value);
      return year >= 2018 && year <= 2024;
    }),
  schoolGRNo: yup.string().required('School GR No is required'),
  headmasterName: yup.string().required('Headmaster name is required'),
  headmasterContact: yup
    .string()
    .required('Headmaster contact is required')
    .test('starts-with-03', 'Contact must start with 03', (value) => value?.startsWith('03'))
    .matches(/^03\d{9}$/, 'Invalid format (03XXXXXXXXX)'),
});

// Validation schema for Step 2 only
export const step2Schema = yup.object().shape({
fatherName: yup.string().required("Father's name is required"),
  fatherCNIC: yup
    .string()
    .required("Father's CNIC is required")
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in format: 12345-1234567-1'),
  domicileDistrict: yup.string().required('District of Domicile is required'),
  guardianName: yup.string(),
  // guardianContact: yup
  //   .string()
  //   .test('starts-with-03', 'Contact must start with 03', function(value) {
  //     if (!value) return true;
  //     return value.startsWith('03');
  //   })
  //   .matches(/^03\d{9}$/, 'Invalid format (03XXXXXXXXX)'),
  contact1: yup
    .string()
    .required('Contact number is required')
    .test('starts-with-03', 'Contact must start with 03', (value) => value?.startsWith('03'))
    .matches(/^03\d{9}$/, 'Invalid format (03XXXXXXXXX)'),
  contact2: yup
    .string()
    .test('starts-with-03', 'Contact must start with 03', function(value) {
      if (!value) return true;
      return value.startsWith('03');
    })
    .matches(/^03\d{9}$/, 'Invalid format (03XXXXXXXXX)'),
});

// Validation schema for Step 5 only
export const step5Schema = yup.object().shape({
 
  testMedium: yup.string().required('Test medium is required'),
  division: yup.string().required('Division is required'),
   acknowledgment: yup
    .boolean()
    .oneOf([true], 'You must acknowledge the terms'),
});


export const loginSchema = yup.object().shape({
  applicantId: yup
    .string()
    .required('Email / Applicant ID is required')
    .email('Please enter a valid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});