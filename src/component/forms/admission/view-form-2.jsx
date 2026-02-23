import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAdminVerifyGuardianSalary, useGetApplicantGuardianInfo } from "../../../../api/client/admin";
import ApplicantReviewHeader from "../../header/applicant-review-header";
import Button from "../../../component/button"

const SALARY_LIMIT = 1200000; // 12 Lakh

const formatSalary = (amount) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(amount);

export const Form2View = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");

  const { data: guardianData, isLoading } = useGetApplicantGuardianInfo({ userId: applicantID });
  const { verfiyGuardianSalary, isSuccess, isPending, isError, error } = useAdminVerifyGuardianSalary(applicantID)

  const guardian = guardianData?.[0] || {};

  const salary = Number(guardian.guardianannualIncome) || 0;
  const isOutOfRange = salary > SALARY_LIMIT;

  const [verification, setVerification] = useState({ status: null, reason: "" });
  const updateVerification = (newStatus, newReason = "") =>
    setVerification((prev) => ({ ...prev, status: newStatus, reason: newReason }));

  const handleSubmit = () => {
    console.log("verification: ", verification)
    if (verification.status === '') {
      return alert("Select Age is valid or not")
    }
    verfiyGuardianSalary(verification)
  }

  const decided = verification.status !== null;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />
        <div className="p-6 sm:p-8 flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400 font-medium">Loading guardian information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ApplicantReviewHeader name='Guardian Income' />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

        <div className="p-6 sm:p-8 flex flex-col gap-6">

          {/* Section Header */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Guardian Salary Verification</h2>
              <p className="text-xs text-gray-400">Maximum allowed salary: {formatSalary(SALARY_LIMIT)}</p>
            </div>
          </div>

          {/* Guardian Info + Salary Banner */}
          <div className="flex flex-col sm:flex-row gap-4">

            {/* Guardian Details */}
            <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col gap-3">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Guardian Name</p>
                <p className="text-sm font-bold text-gray-900">{guardian.guardianName || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Relation</p>
                <p className="text-sm font-medium text-gray-800">{guardian.relation || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Occupation</p>
                <p className="text-sm font-medium text-gray-800">{guardian.guardianProfession || "—"}</p>
              </div>
            </div>

            {/* Salary Card */}
            <div className={`flex-1 rounded-xl border-2 p-4 flex flex-col items-center justify-center text-center gap-2 transition-all ${isOutOfRange
              ? "bg-red-50 border-red-200"
              : "bg-emerald-50 border-emerald-200"
              }`}>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Monthly Salary</p>
              <p className={`text-2xl font-black ${isOutOfRange ? "text-red-600" : "text-emerald-600"}`}>
                {formatSalary(salary)}
              </p>

              {/* Recommendation Badge */}
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${isOutOfRange
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                }`}>
                {isOutOfRange ? (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Salary is Out of Range
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    Salary is Within Range
                  </>
                )}
              </span>

              {/* Limit info */}
              <p className={`text-xs ${isOutOfRange ? "text-red-400" : "text-emerald-500"}`}>
                {isOutOfRange
                  ? `Exceeds limit by ${formatSalary(salary - SALARY_LIMIT)}`
                  : `${formatSalary(SALARY_LIMIT - salary)} below the limit`}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100" />

          {/* Application Status and Remark */}
          <div className="flex flex-col gap-1">
            {guardian?.is_gurdian_salary_verified === 'true' && (
              <p>Status: <span className="capitalize">{guardian?.is_gurdian_salary_verified === 'true' && 'Approved'}</span></p>
            )}

            {(guardian?.application_status === 'Rejected' && guardian?.is_gurdian_salary_verified === 'false') && (
              <>
                <p>Status: <span className="capitalize">{guardian?.is_gurdian_salary_verified === 'false' && 'Rejected'}</span></p>
                <p>Reason: <span className="">{guardian?.application_remark}</span></p>
              </>
            )}
          </div>

          {/* Admin Decision */}
          {!(guardian?.is_gurdian_salary_verified === 'false' || guardian?.is_gurdian_salary_verified === 'true') && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Admin Decision — Guardian Salary
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
                  Salary is Correct
                </button>
                <button
                  type="button"
                  onClick={() => updateVerification("false", "Salary is out of range")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${verification.status === "false"
                    ? "bg-red-500 border-red-500 text-white shadow-lg scale-[1.02]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500 hover:bg-red-50"
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Salary is Not Correct
                </button>
              </div>

              {decided ? (
                <div className={`mt-3 flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg ${verification.status === "true" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
                  }`}>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {verification.status === "true"
                    ? "You have marked the guardian's salary as correct."
                    : "You have marked the guardian's salary as not correct. This will be flagged for review."}
                </div>
              ) : (
                <p className="mt-3 text-xs text-gray-400 text-center">
                  Please make a decision before proceeding
                </p>
              )}
            </div>
          )}

        </div>
      </div>
      {!(guardian?.is_gurdian_salary_verified === 'false' || guardian?.is_gurdian_salary_verified === 'true') && (
        <Button
          isLoading={isPending}
          onClick={handleSubmit}
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Next Step →
        </Button>
      )}

      {/* {(guardian?.is_gurdian_salary_verified === 'false' || guardian?.is_gurdian_salary_verified === 'true') && (
        <div className="flex gap-4">
          <Button
            isLoading={isPending}
            onClick={() => navigate(`/admin/applications/view-form-1?applicantID=${applicantID}`)}
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Previous
          </Button>
          <Button
            isLoading={isPending}
            onClick={() => navigate(`/admin/applications/view-form-3?applicantID=${applicantID}`)}
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Next
          </Button>
        </div>
      )} */}

    </div>
  );
};