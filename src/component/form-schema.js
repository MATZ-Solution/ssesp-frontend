import * as yup from 'yup';
export const validationSchema = yup.object().shape({
  // Student Information
  studentName: yup
    .string()
    .required('Student name is required')
    .matches(/^[A-Z\s]+$/, 'Name must be in CAPITAL LETTERS only')
    .test('no-lowercase', 'Name must be in CAPITAL LETTERS only', (value) => {
      if (!value) return true;
      return value === value.toUpperCase();
    }),
  gender: yup.string().required('Gender is required'),
  studentBForm: yup
    .string()
    .required('Student B-Form is required')
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'B-Form must be in format: 12345-1234567-1'),
  dobDay: yup
    .number()
    .required('Day is required')
    .min(1, 'Day must be between 1 and 31')
    .max(31, 'Day cannot be greater than 31')
    .integer('Day must be a whole number'),
  dobMonth: yup.string().required('Month is required'),
  dobYear: yup
    .number()
    .required('Year is required')
    .min(1920, 'Age should not exceed eleven years')
    .max(2018, 'Invalid year'),
  religion: yup.object().required('Religion is required').nullable(),
  
  // Father/Guardian Information
  fatherName: yup.string().required("Father's name is required"),
  fatherCNIC: yup
    .string()
    .required("Father's CNIC is required")
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in format: 12345-1234567-1'),
  domicileDistrict: yup.string().required('District of Domicile is required'),
  guardianName: yup.string(),
  guardianContact: yup
    .string()
    .test('starts-with-03', 'Contact number must start with 03', function(value) {
      if (!value) return true;
      return value.startsWith('03');
    })
    .matches(/^03\d{9}$/, 'Invalid contact number format (must be 03XXXXXXXXX)'),
  contact1: yup
    .string()
    .required('At least one contact number is required')
    .test('starts-with-03', 'Contact number must start with 03', (value) => {
      if (!value) return false;
      return value.startsWith('03');
    })
    .matches(/^03\d{9}$/, 'Invalid contact number format (must be 03XXXXXXXXX)'),
  contact2: yup
    .string()
    .test('starts-with-03', 'Contact number must start with 03', function(value) {
      if (!value) return true;
      return value.startsWith('03');
    })
    .matches(/^03\d{9}$/, 'Invalid contact number format (must be 03XXXXXXXXX)'),
  
  // Address Information
  postalAddress: yup.string().required('Postal address is required'),
  province: yup.object().required('Province is required').nullable(),
  district: yup.object().required('District is required').nullable(),
  city: yup.object().required('City is required').nullable(),
  
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
    .test('starts-with-03', 'Contact number must start with 03', (value) => {
      if (!value) return false;
      return value.startsWith('03');
    })
    .matches(/^03\d{9}$/, 'Invalid contact number format (must be 03XXXXXXXXX)'),
  
  // Entry Test Preference
  testMedium: yup.string().required('Medium of instruction is required'),
  division: yup.string().required('Division is required'),
  
  // Photo Upload
  photo: yup
    .mixed()
    .required('Student photo is required.')
    .test('fileSize', 'File size must not exceed 5MB', (value) => {
      if (!value || !value[0]) return false;
      return value[0].size <= 5 * 1024 * 1024; // 5MB in bytes
    })
    .test('fileType', 'Only image files (JPG, JPEG, PNG) are allowed', (value) => {
      if (!value || !value[0]) return false;
      return ['image/jpeg', 'image/jpg', 'image/png'].includes(value[0].type);
    }),
  
  // Acknowledgment
  acknowledgment: yup
    .boolean()
    .oneOf([true], 'You must acknowledge the terms and conditions'),
});