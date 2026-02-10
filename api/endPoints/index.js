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
    addApplicantTestPreference: "/api/applicant/addApplicantTestPreference",

    getApplicantInfo: "/api/applicant/getApplicantInfo",
    getApplicantGuardianInfo: "/api/applicant/getApplicantGuardianInfo",
    getApplicantAddressInfo: "/api/applicant/getApplicantAddressInfo",
    getApplicantSchoolInfo: "/api/applicant/getApplicantSchoolInfo",
    getApplicantTestPreference: "/api/applicant/getApplicantTestPreference",

  },
};

export default API_ROUTE;
