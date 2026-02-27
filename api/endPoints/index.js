const API_ROUTE = {
  user: {
    login: "/api/user/signIn",
    signUp: "/api/user/signUp",
    sendOtp: "/api/user/sendOtp",
    submitOtp: "/api/user/submitOtp",
    checkapi: "/api/user/checkapi",
    changePasword: "/api/user/changePasword",
  },
  applicant: {
    addApplicantInfo: "/api/applicant/addApplicantInfo",
    addApplicantGuardianInfo: "/api/applicant/addApplicantGuardianInfo",
    addApplicantAddressInfo: "/api/applicant/addApplicantAddressInfo",
    addApplicantSchoolInfo: "/api/applicant/addApplicantSchoolInfo",
    addApplicantDocument: "/api/applicant/addApplicantDocument",
    addApplicantSchoolPreference: "/api/applicant/addApplicantSchoolPreference",
    applicantEditDocument: "/api/applicant/applicantEditDocument",

    getApplicantInfo: "/api/applicant/getApplicantInfo",
    getApplicantGuardianInfo: "/api/applicant/getApplicantGuardianInfo",
    getApplicantAddressInfo: "/api/applicant/getApplicantAddressInfo",
    getApplicantSchoolInfo: "/api/applicant/getApplicantSchoolInfo",
    getApplicantSchoolPreference: "/api/applicant/getApplicantSchoolPreference",
    getApplicantPDFinfo: "/api/applicant/getApplicantPDFinfo",
    getApplicantDocuments: "/api/applicant/getApplicantDocuments",
    getIsApplicantVerified: "/api/applicant/getIsApplicantVerified",
    
  },

  admin: {
    signIn: "/api/admin/signIn",
    signUp: "/api/admin/signUp",
    exportApplicants: "/api/admin/export-applicants",

    getDashbaordData: "/api/admin/getDashbaordData",
    getDashbaordApplicantRecentData: "/api/admin/getDashbaordApplicantRecentData",
    getDashbaordApplicantData: "/api/admin/getDashbaordApplicantData",
    getApplicantInfo: "/api/admin/getApplicantInfo",
    getApplicantGuardianInfo: "/api/admin/getApplicantGuardianInfo",
    getApplicantDocuments: "/api/admin/getApplicantDocuments",
    getApplicantAddressInfo: "/api/admin/getApplicantAddressInfo",
    getApplicantSchoolInfo: "/api/admin/getApplicantSchoolInfo",
    getApplicantSchoolPreference: "/api/admin/getApplicantSchoolPreference",

    adminVerifyAge: "/api/admin/adminVerifyAge",
    adminVerifyGuardianSalary: "/api/admin/adminVerifyGuardianSalary",
    adminVerifyApplicantSchool: "/api/admin/adminVerifyApplicantSchool",
    adminVerifyDocument: "/api/admin/adminVerifyDocument",
    
  }
};

export default API_ROUTE;
