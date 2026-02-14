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
  religion: yup.string().required("Religion is required"),
  files: yup
    .mixed()
    .required("Student photo is required")
    .test(
      "fileSize",
      "File size must be less than 1MB",
      (value) => value && value.size <= 1 * 1024 * 1024
    )
    .test(
      "fileType",
      "Only JPG, JPEG, and PNG files are allowed",
      (value) =>
        value &&
        ["image/jpeg", "image/jpg", "image/png"].includes(value.type)
    )
});

// Validation schema for Step 3 only
export const step3Schema = yup.object().shape({
  postalAddress: yup
    .string()
    .trim()
    .required("Postal address is required"),

  division: yup
    .mixed()
    .transform((value) => value?.label || value)
    .required("Division is required"),

  district: yup
    .mixed()
    .transform((value) => value?.label || value)
    .required("District is required"),
});
// Validation schema for Step 4 only

export const step4Schema = yup.object().shape({
  // Current School Information
  schoolName: yup
    .string()
    .required("School name is required")
    .min(3, "School name must be at least 3 characters")
    .trim(),

  schoolCategory: yup
    .string()
    .required("School category is required"),

  schoolSemisCode: yup
    .string()
    .required("School SEMIS/Code is required")
    .matches(/^\d{9}$/, "SEMIS Code must be exactly 9 digits")
    .length(9, "SEMIS Code must be exactly 9 digits"),

  studyingInClass: yup
    .string()
    .nullable()
    .required("Currently studying class is required"),

  enrollmentYear: yup
    .string()
    .required("Year of enrollment is required")
    .matches(/^\d{4}$/, "Year must be 4 digits")
    .test("valid-year", "Please enter a valid year", (value) => {
      if (!value) return false;
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      return year >= 1950 && year <= currentYear;
    }),

  schoolGRNo: yup
    .string()
    .required("School GR number is required")
    .trim(),

  headmasterName: yup
    .string()
    .required("Headmaster/Principal name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters")
    .trim(),

  // Previous School Records (Class 5 to 8)
  previous_school: yup.array().of(
    yup.object().shape({
      class: yup
        .string()
        .required("Class is required"),

      schoolCategory: yup
        .string()
        .required("School category is required for this class"),

      semisCode: yup
        .string()
        .required("SEMIS Code is required for this class")
        .matches(/^\d{9}$/, "SEMIS Code must be exactly 9 digits")
        .length(9, "SEMIS Code must be exactly 9 digits"),

      district: yup
        .string()
        .required("District is required for this class"),

      yearOfPassing: yup
        .string()
        .required("Year of passing is required for this class")
        .matches(/^\d{4}$/, "Year must be 4 digits")
        .test("valid-year", "Please enter a valid year", (value) => {
          if (!value) return false;
          const year = parseInt(value);
          const currentYear = new Date().getFullYear();
          return year >= 1950 && year <= currentYear;
        })
        .test("chronological-order", "Year should match class progression", function(value) {
          const { class: className } = this.parent;
          if (!value || !className) return true;
          
          const year = parseInt(value);
          const currentYear = new Date().getFullYear();
          
          // Year should not be in the future
          if (year > currentYear) return false;
          
          return true;
        }),
    })
  ).min(4, "All 4 class records are required").required("Previous school records are required"),
});

// Validation schema for Step 2 only

// CNIC validation regex: 12345-1234567-1
const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

// Phone number validation: Must start with 03 and be 11 digits
const phoneRegex = /^03\d{9}$/;

export const step2Schema = yup.object().shape({
  fatherName: yup
    .string()
    .required("Father's / Guardian name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must not exceed 100 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  fatherCNIC: yup
    .string()
    .required("Father's / Guardian CNIC is required")
    .matches(cnicRegex, "CNIC must be in format: 12345-1234567-1"),

  domicileDistrict: yup
    .string()
    .required("District of Domicile is required"),

  Profession: yup
    .string()
    .required("Profession is required")
    .min(2, "Profession must be at least 2 characters")
    .max(100, "Profession must not exceed 100 characters"),

  guardianannualIncome: yup
    .number()
    .typeError("Annual income must be a number")
    .required("Annual income is required")
    .positive("Annual income must be a positive number")
    .integer("Annual income must be a whole number")
    .min(0, "Annual income cannot be negative"),

  relation: yup
    .string()
    .optional(), 

  contact1: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Phone number must start with 03 and be 11 digits"),

  contact2: yup
    .string()
    .required("WhatsApp number is required")
    .matches(phoneRegex, "WhatsApp number must start with 03 and be 11 digits"),
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

export const documentUploadSchema = yup.object().shape({
    document1: yup
        .mixed()
        .required("Document 1 is required")
        .test("fileSize", "File size must not exceed 5MB", (value) => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Only PDF, JPG, JPEG, and PNG files are allowed", (value) => {
            if (!value) return true;
            return ["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
    document2: yup
        .mixed()
        .required("Document 2 is required")
        .test("fileSize", "File size must not exceed 5MB", (value) => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Only PDF, JPG, JPEG, and PNG files are allowed", (value) => {
            if (!value) return true;
            return ["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
    document3: yup
        .mixed()
        .required("Document 3 is required")
        .test("fileSize", "File size must not exceed 5MB", (value) => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Only PDF, JPG, JPEG, and PNG files are allowed", (value) => {
            if (!value) return true;
            return ["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
    document4: yup
        .mixed()
        .required("Document 4 is required")
        .test("fileSize", "File size must not exceed 5MB", (value) => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024;
        })
        .test("fileType", "Only PDF, JPG, JPEG, and PNG files are allowed", (value) => {
            if (!value) return true;
            return ["application/pdf", "image/jpeg", "image/jpg", "image/png"].includes(value.type);
        }),
});