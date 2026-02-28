import * as yup from 'yup';



const bFormRegex = /^\d{5}-\d{7}-\d{1}$/;

export const step1Schema = yup.object().shape({
  studentName: yup
    .string()
    .required("Student name is required")
    .matches(/^[A-Z\s]+$/, "Name must be in CAPITAL LETTERS only")
    .min(3, "Name must be at least 3 characters"),

  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["male", "female", "other"], "Please select a valid gender"),

  noBForm: yup
    .boolean()
    .default(false),
 

  studentBForm: yup
    .string()
    .when("noBForm", {
      is: false,
      then: (schema) => schema
        .required("B-Form number is required")
        .matches(bFormRegex, "Invalid B-Form format. Use: 12345-1234567-1")
        .length(15, "B-Form must be exactly 15 characters"),
      otherwise: (schema) => schema.notRequired().nullable(),
    }),

  dob: yup
    .date()
    .required("Date of birth is required")
    .min(new Date("2011-01-01"), "Date must be after January 1, 2011")
    .max(new Date("2015-12-31"), "Date must be before December 31, 2015")
    .typeError("Please enter a valid date"),

  religion: yup
    .string()
    .required("Religion is required")
    .nullable(),

  files: yup
    .mixed()
    .required("Student photo is required")
    .test("fileSize", "File size must not exceed 1MB", (value) => {
      if (!value) return false;
      return value.size <= 1 * 1024 * 1024;
    })
    .test("fileType", "Only JPG, JPEG, and PNG files are allowed", (value) => {
      if (!value) return false;
      return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
    }),
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


const currentYear = new Date().getFullYear();

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
    .oneOf(["7", "8"], "Please select either Class 7 or Class 8")
    .required("Currently studying class is required"),

  enrollmentYear: yup
    .string()
    .required("Year of enrollment is required")
    .matches(/^\d{4}$/, "Year must be 4 digits")
    .test("valid-year", "Please enter a valid year", (value) => {
      if (!value) return false;
      const year = parseInt(value);
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

  // Previous School Records — dynamic based on studyingInClass (8 → classes 5,6,7 | 9 → classes 6,7,8)
  
  previous_school: yup
    .array()
    .of(
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
            return year >= 1950 && year <= currentYear;
          })
          .test(
            "not-future-year",
            "Year of passing cannot be in the future",
            (value) => {
              if (!value) return true;
              return parseInt(value) <= currentYear;
            }
          ),
      })
    )
    .length(3, "All 3 class records are required")
    .required("Previous school records are required")
    .test(
      "classes-match-selected-class",
      "Previous class records do not match the selected class",
      function (records) {
        const studyingInClass = this.parent.studyingInClass;
        if (!studyingInClass || !records || records.length !== 3) return true;

        // Class 8 selected => previous records: 6, 7, 8
        // Class 7 selected => previous records: 5, 6, 7
        const expectedClasses =
          studyingInClass === "8" ? ["5", "6", "7"] : ["4", "5", "6"];

        return records.every(
          (record, index) => record?.class === expectedClasses[index]
        );
      }
    ),
});

// Validation schema for Step 2 only

// CNIC validation regex: 12345-1234567-1
const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

// Phone number validation: Must start with 03 and be 11 digits
const phoneRegex = /^03\d{9}$/;

export const step2Schema = yup.object().shape({
  guardianName: yup
    .string()
    .required("Father's / Guardian name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must not exceed 100 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),

  guardianCNIC: yup
    .string()
    .required("Father's / Guardian CNIC is required")
    .matches(cnicRegex, "CNIC must be in format: 12345-1234567-1"),

  guardianDomicileDistrict: yup
    .string()
    .required("District of Domicile is required"),

  guardianProfession: yup
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
  .min(0, "Annual income cannot be negative")
  .max(1200000, "Annual income must not exceed 1,200,000 PKR"),

  relation: yup.string().optional(),

  guardianContactNumber: yup
    .string()
    .required("Phone number is required")
    .matches(phoneRegex, "Phone number must start with 03 and be 11 digits"),

  guardianContactWhattsappNumber: yup
    .string()
    .required("WhatsApp number is required")
    .matches(phoneRegex, "WhatsApp number must start with 03 and be 11 digits"),

  // ✅ FIXED SEF SIBLING VALIDATION
  siblings_under_sef: yup
    .string()
    .required("Please select Yes or No"),

no_siblings_under_sef: yup
  .mixed()  // ← Use mixed() instead of number()
  .nullable()
  .when("siblings_under_sef", {
    is: "yes",
    then: (schema) =>
      schema
        .required("Please enter number of siblings")
        .test("is-1-or-2", "Only 1 or 2 siblings are allowed", (val) =>
          val === 1 || val === 2
        ),
    otherwise: (schema) => schema.nullable().notRequired().transform(() => null),
  }),

});


// Validation schema for Step 5 only

export const step5Schema = yup.object().shape({
  priority: yup.array().of(
    yup.object().shape({
      schoolName: yup.string().required('School is required'),
      priority: yup.number().required('Priority is required'),
    })
  ).min(1, 'At least one school must be selected'),
});

// export const step5Schema = yup.object().shape({

//   first_priority_school: yup.string().required('School 1 is required'),
//   second_priority_school: yup.string().required('School 2 is required'),
//   third_priority_school: yup.string().required('School 3 is required'),

//   testMedium: yup.string().required('Test medium is required'),
//   division: yup.string().required('Division is required'),
//   acknowledgment: yup
//     .boolean()
//     .oneOf([true], 'You must acknowledge the terms'),
// });


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

const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
const maxSize = 1 * 1024 * 1024; // 1MB

const documentField = (label) =>
  yup
    .mixed()
    .required(`${label} is required`)
    .test("fileSize", "File size must not exceed 1MB", (value) => {
      if (!value) return true;
      return value.size <= maxSize;
    })
    .test("fileType", "Only JPG, JPEG, and PNG files are allowed", (value) => {
      if (!value) return true;
      return allowedTypes.includes(value.type);
    });

export const documentUploadSchema = yup.object().shape({
  document1: documentField("Birth Certificate (B-Form)"),
  document2: documentField("Parent/Guardian Domicile"),
  document3: documentField("Parent/Guardian CNIC"),
  document4: documentField("Parent/Guardian PRC"),
  document5: documentField("Parents/Guardian Income Certification"),
});