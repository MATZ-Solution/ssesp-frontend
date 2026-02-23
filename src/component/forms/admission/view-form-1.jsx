import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAdminVerifyAge, useGetApplicantInfo } from "../../../../api/client/admin";
import ApplicantReviewHeader from "../../header/applicant-review-header";
import Button from "../../../component/button"

export const Form1View = () => {
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const { data: studentInfo, isLoading, eligible } = useGetApplicantInfo({ userId: applicantID });
  const { verfiyAge, isSuccess, isPending, isError, error } = useAdminVerifyAge(applicantID)

  const data = studentInfo?.[0] || {};

  const [verification, setVerification] = useState({ status: null, reason: "" });
  const updateVerification = (newStatus, newReason = "") =>
    setVerification((prev) => ({ ...prev, status: newStatus, reason: newReason }));

  const handleSubmit = () => {
    console.log("verification: ", verification)
    if (verification.status === '') {
      return alert("Select Age is valid or not")
    }
    verfiyAge(verification)
  }

  const isEligible = eligible === "Eligible" || eligible === true;
  const decided = verification.status !== null;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500" />
        <div className="p-6 sm:p-8 flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400 font-medium">Loading student information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ApplicantReviewHeader name='age' />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500" />

        <div className="p-6 sm:p-8 flex flex-col gap-6">

          {/* Student Info Row */}
          <div className="flex items-center gap-4">
            <div
              onClick={() => data?.fileUrl && setShowPhotoModal(true)}
              className={`w-16 h-16 rounded-full overflow-hidden border-2 flex-shrink-0 flex items-center justify-center bg-gray-100 transition-all
                ${data?.fileUrl ? "border-blue-300 cursor-pointer hover:border-blue-500 hover:scale-105" : "border-gray-200"}`}
            >
              {data?.fileUrl ? (
                <img src={data.fileUrl} alt="Student" className="w-full h-full object-cover" />
              ) : (
                <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold text-gray-900 truncate">{data?.studentName || "—"}
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                DOB:{" "}
                <span className="font-medium text-gray-700">
                  {data?.dob
                    ? new Date(data.dob).toLocaleDateString("en-PK", { day: "2-digit", month: "long", year: "numeric" })
                    : "—"}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Class: <span className="font-medium text-gray-700">{data?.studyingInClass || "—"}</span>
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Eligibility Banner */}
          <div className={`rounded-xl p-4 flex items-center gap-4 ${isEligible ? "bg-emerald-50 border border-emerald-200" : "bg-red-50 border border-red-200"}`}>
            <div className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center ${isEligible ? "bg-emerald-100" : "bg-red-100"}`}>
              {isEligible ? (
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-bold ${isEligible ? "text-emerald-700" : "text-red-700"}`}>
                {isEligible ? "Student is Eligible" : "Student is Not Eligible"}
              </p>
              <p className={`text-xs mt-0.5 ${isEligible ? "text-emerald-600" : "text-red-500"}`}>
                Age on 1st April 2026:{" "}
                <span className="font-semibold">{data?.age ?? "—"} years</span>
                {data?.maxAgeAllowed && (
                  <span className="ml-1 opacity-75">(Max allowed: {data.maxAgeAllowed} yrs)</span>
                )}
              </p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${isEligible ? "bg-emerald-200 text-emerald-800" : "bg-red-200 text-red-800"}`}>
              {isEligible ? "Recommended ✓" : "Not Recommended"}
            </span>
          </div>

          {/* Application Status and Remark */}
          <div className="flex flex-col gap-1">
            {data?.is_age_verified === 'true' && (
              <p>Status: <span className="capitalize">{data?.is_age_verified === 'true' && 'Approved'}</span></p>
            )}

            {(data?.application_status === 'Rejected' && data?.is_age_verified === 'false') && (
              <>
                <p>Status: <span className="capitalize">{data?.is_age_verified === 'false' && 'Rejected'}</span></p>
                <p>Reason: <span className="">{data?.application_remark}</span></p>
              </>
            )}
          </div>

          <div className="border-t border-gray-100" />

          {/* Admin Decision */}
          {!(data?.is_age_verified === 'false' || data?.is_age_verified === 'true') && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Admin Decision — Age
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => updateVerification("true")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${verification.status === "true"
                    ? "bg-emerald-500 border-emerald-500 text-white shadow-lg scale-[1.02]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  Age is Valid
                </button>
                <button
                  type="button"
                  onClick={() => updateVerification("false", "Age is invalid")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${verification.status === "false"
                    ? "bg-red-500 border-red-500 text-white shadow-lg scale-[1.02]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500 hover:bg-red-50"
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Age is Not Valid
                </button>
              </div>

              {decided ? (
                <div className={`mt-3 flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg ${verification.status === "true" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {verification.status === "true"
                    ? "You have marked this student's age as valid."
                    : "You have marked this student's age as not valid. This will be flagged for review."}
                </div>
              ) : (
                <p className="mt-3 text-xs text-gray-400 text-center">
                  Please make a decision before proceeding
                </p>
              )}
            </div>
          )}

          {/* Previous Button */}
          {!(data?.is_age_verified === 'false' || data?.is_age_verified === 'true') && (
            <div className="flex gap-4">
              <Button
                isLoading={isPending}
                onClick={handleSubmit}
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Submit
              </Button>
            </div>
          )}

          {/* {data?.application_status !== "Rejected" && (
            <div className="flex gap-4">
              <Button
                isLoading={isPending}
                onClick={handleSubmit}
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Submit
              </Button>
            </div>
          )} */}

        </div>
      </div>

      {/* Photo Modal */}
      {showPhotoModal && data?.fileUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setShowPhotoModal(false)}
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 shadow-lg z-10 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={data.fileUrl}
              alt="Student photo enlarged"
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};