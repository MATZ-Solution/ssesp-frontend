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

    getApplicantInfo: "/api/applicant/getApplicantInfo",
    getApplicantGuardianInfo: "/api/applicant/getApplicantGuardianInfo",
    getApplicantAddressInfo: "/api/applicant/getApplicantAddressInfo",
    getApplicantSchoolInfo: "/api/applicant/getApplicantSchoolInfo",
    getApplicantSchoolPreference: "/api/applicant/getApplicantSchoolPreference",
    getApplicantPDFinfo: "/api/applicant/getApplicantPDFinfo"
  },
};

export default API_ROUTE;
