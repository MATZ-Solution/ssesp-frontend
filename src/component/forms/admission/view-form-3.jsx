import React, { useState } from "react";
import Button from "../../../component/button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAdminVerifyApplicantSchool, useGetApplicantSchoolInfo } from "../../../../api/client/admin";
import ApplicantReviewHeader from "../../header/applicant-review-header";

const tableColumns = [
  { label: "Class", key: "class" },
  { label: "School Category", key: "schoolCategory" },
  { label: "SEMIS Code", key: "semisCode" },
  { label: "District", key: "district" },
  { label: "Year of Passing", key: "yearOfPassing" },
];

export const Form3View = () => {

  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");
  const navigate = useNavigate()

  const { previousSchool: schoolData, data, isLoading } = useGetApplicantSchoolInfo({ userId: applicantID });
  const previousSchool = schoolData || [];
  const datas = data?.[0] || []

  const [verification, setVerification] = useState({ status: null, reason: "" });
  const { verfiyApplicantSchool, isSuccess, isPending, isError, error } = useAdminVerifyApplicantSchool(applicantID)
  const updateVerification = (newStatus, newReason = "") =>
    setVerification((prev) => ({ ...prev, status: newStatus, reason: newReason }));

  const handleSubmit = () => {
    console.log("verification: ", verification)
    if (verification.status === '') {
      return alert("Select Age is valid or not")
    }
    verfiyApplicantSchool(verification)
  }

  const decided = verification.status !== null;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-500" />
        <div className="p-6 sm:p-8 flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400 font-medium">Loading school records...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ApplicantReviewHeader name="Previous School" />
      <div className="mt-5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-500" />

        <div className="p-6 sm:p-8 flex flex-col gap-6">

          {/* Section Header */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">Previous School Records</h2>
              <p className="text-xs text-gray-400">Verify the student's previous school history</p>
            </div>
          </div>

          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-blue-700 font-semibold text-sm">
              🎓 Currently in {datas?.studyingInClass}
            </span>
          </div>


          {/* Empty State */}
          {previousSchool.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-400 font-medium">No previous school records available</p>
            </div>
          ) : (
            <>
              {/* ── Desktop Table ── */}
              <div className="hidden md:block rounded-xl overflow-hidden border border-gray-200">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      {tableColumns.map(({ label }) => (
                        <th
                          key={label}
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {previousSchool.map((record, index) => (
                      <tr
                        key={index}
                        className={`transition-colors duration-200 ${decided && verification.status === true ? "bg-emerald-50"
                          : decided && verification.status === false ? "bg-red-50"
                            : "bg-white hover:bg-gray-50"
                          }`}
                      >
                        {tableColumns.map(({ key }) => (
                          <td
                            key={key}
                            className={`px-4 py-3.5 text-sm whitespace-nowrap font-medium ${decided && verification.status === true ? "text-emerald-800"
                              : decided && verification.status === false ? "text-red-800"
                                : "text-gray-800"
                              }`}
                          >
                            {key === "class" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                                Class {record[key]}
                              </span>
                            ) : (
                              record[key] || "—"
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── Mobile Cards ── */}
              <div className="md:hidden space-y-3">
                {previousSchool.map((record, index) => (
                  <div
                    key={index}
                    className={`rounded-xl border-2 p-4 transition-all duration-200 ${decided && verification.status === true ? "bg-emerald-50 border-emerald-300"
                      : decided && verification.status === false ? "bg-red-50 border-red-300"
                        : "bg-gray-50 border-gray-200"
                      }`}
                  >
                    <div className="mb-3 pb-2.5 border-b border-gray-200">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                        Class {record.class}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {tableColumns.slice(1).map(({ label, key }) => (
                        <div key={key}>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
                          <p className="text-sm font-medium text-gray-800">{record[key] || "—"}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Application Status and Remark */}
          {datas?.is_school_verified === 'true' && (
            <div className="flex flex-col gap-2 p-3 rounded-xl bg-white shadow-sm w-fit min-w-[200px]">
              <p className="flex items-center gap-2 text-sm text-black font-medium">
                Status:
                <span className="capitalize inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  {datas?.is_school_verified === 'true' && 'Approved'}
                </span>
              </p>
            </div>
          )}

          {(datas?.application_status === 'rejected' && datas?.is_school_verified === 'false') && (
            <div className="flex flex-col gap-2 p-3 rounded-xl bg-white shadow-sm w-fit min-w-[200px]">
              <p className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                Status:
                <span className="capitalize inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 ring-1 ring-rose-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                  {datas?.is_school_verified === 'false' && 'rejected'}
                </span>
              </p>
              <p className="flex flex-col gap-0.5 border-l-2 border-rose-300 pl-2.5 text-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Reason</span>
                <span className="text-rose-600 leading-snug">{datas?.application_remark}</span>
              </p>
            </div>
          )}

          {/* Admin Decision — bottom */}
          {!(datas?.is_school_verified === 'false' || datas?.is_school_verified === 'true') && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                Admin Decision — Previous School Records
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
                  Records are Correct
                </button>
                <button
                  type="button"
                  onClick={() => updateVerification("false", "School records are invalid")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${verification.status === "false"
                    ? "bg-red-500 border-red-500 text-white shadow-lg scale-[1.02]"
                    : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500 hover:bg-red-50"
                    }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Records are Incorrect
                </button>
              </div>

              {decided ? (
                <div className={`mt-3 flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg ${verification.status === "true" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {verification.status === "true"
                    ? "You have marked the previous school records as correct."
                    : "You have marked the previous school records as incorrect. This will be flagged for review."}
                </div>
              ) : (
                <p className="mt-3 text-xs text-gray-400 text-center">
                  Please make a decision before proceeding
                </p>
              )}
            </div>
          )}

          {!(datas?.is_school_verified === 'false' || datas?.is_school_verified === 'true' || !verification.status) && (
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
        </div>

        {/* {(datas?.is_school_verified === 'false' || datas?.is_school_verified === 'true') && (
          <div className="flex gap-4">
            <Button
              isLoading={isPending}
              onClick={()=> navigate(`/admin/applications/view-form-2?applicantID=${applicantID}`)}
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Previous
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Form3View;

// import React, { useState } from "react";
// import Button from "../../button";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useGetApplicantSchoolInfo } from "../../../../api/client/admin";

// export const Form3View = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const applicantID = searchParams.get("applicantID");

//   const { data: response, previousSchool: schoolData, isLoading } = useGetApplicantSchoolInfo({ userId: applicantID });

//   const data = response?.[0] || {};
//   const previousSchool = schoolData || [];

//   const [checklist, setChecklist] = useState(
//     Object.fromEntries(FIELD_KEYS.map((key) => [key, null]))
//   );

//   const [rowChecklist, setRowChecklist] = useState(
//     Object.fromEntries(previousSchool.map((_, i) => [i, null]))
//   );

//   const handleToggle = (fieldKey, value) => {
//     const newStatus = checklist[fieldKey] === value ? null : value;
//     setChecklist((prev) => ({ ...prev, [fieldKey]: newStatus }));
//   };

//   const handleRowToggle = (index, value) => {
//     const newStatus = rowChecklist[index] === value ? null : value;
//     setRowChecklist((prev) => ({ ...prev, [index]: newStatus }));
//   };

//   const fieldReviewedCount = FIELD_KEYS.filter((key) => checklist[key] !== null).length;
//   const rowReviewedCount   = Object.values(rowChecklist).filter((v) => v !== null).length;
//   const totalFields        = FIELD_KEYS.length + previousSchool.length;
//   const totalReviewed      = fieldReviewedCount + rowReviewedCount;
//   const correctCount       = FIELD_KEYS.filter((k) => checklist[k] === "correct").length + Object.values(rowChecklist).filter((v) => v === "correct").length;
//   const wrongCount         = FIELD_KEYS.filter((k) => checklist[k] === "wrong").length  + Object.values(rowChecklist).filter((v) => v === "wrong").length;
//   const allReviewed        = totalReviewed === totalFields;

//   const handleNext = () => {
//     if (!allReviewed) return;
//     navigate(`/admin/applications/view-form-4?applicantID=${applicantID}`);
//   };

//   const previousClassLabel =
//     data.studyingInClass === "Class 8" || data.studyingInClass === "8"
//       ? "Previous Class Records (Class 5 to 7)"
//       : data.studyingInClass === "Class 7" || data.studyingInClass === "7"
//       ? "Previous Class Records (Class 4 to 6)"
//       : "Previous Class Records";

//   const tableColumns = [
//     { label: "Class",           key: "class" },
//     { label: "School Category", key: "schoolCategory" },
//     { label: "SEMIS Code",      key: "semisCode" },
//     { label: "District",        key: "district" },
//     { label: "Year of Passing", key: "yearOfPassing" },
//   ];

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
//           <p className="text-sm text-gray-500 font-medium">Loading school information...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">

//         {/* Page Header */}
//         <div className="mb-6">
//           <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Admin Review</p>
//           <h1 className="text-2xl font-bold text-gray-900">School Information Verification</h1>
//           <p className="text-sm text-gray-500 mt-1">Review and verify the student's current and previous school records</p>
//         </div>

//         {/* Progress Bar */}
//         <div className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between gap-4 flex-wrap">
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-1.5">
//               <span className="w-2 h-2 rounded-full bg-emerald-400" />
//               <span className="text-xs font-semibold text-emerald-700">{correctCount} Correct</span>
//             </div>
//             <div className="w-px h-4 bg-gray-200" />
//             <div className="flex items-center gap-1.5">
//               <span className="w-2 h-2 rounded-full bg-red-400" />
//               <span className="text-xs font-semibold text-red-600">{wrongCount} Wrong</span>
//             </div>
//             <div className="w-px h-4 bg-gray-200" />
//             <div className="flex items-center gap-1.5">
//               <span className="w-2 h-2 rounded-full bg-gray-300" />
//               <span className="text-xs font-semibold text-gray-500">{totalReviewed}/{totalFields} Reviewed</span>
//             </div>
//           </div>
//           {/* Progress track */}
//           <div className="flex-1 min-w-32 max-w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
//               style={{ width: `${totalFields > 0 ? (totalReviewed / totalFields) * 100 : 0}%` }}
//             />
//           </div>
//         </div>

//         {/* ── Current School Card ── */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
//           <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500" />

//           <div className="p-6 sm:p-8 flex flex-col gap-5">
//             <div className="flex items-center gap-2 mb-1">
//               <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
//                 <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className="text-base font-bold text-gray-900">Current School Details</h2>
//                 <p className="text-xs text-gray-400">School Information — View Only</p>
//               </div>
//             </div>

//             {/* School Name */}
//             <Field
//               label="School Name"
//               value={data.schoolName}
//               fieldKey="schoolName"
//               status={checklist.schoolName}
//               onToggle={handleToggle}
//             />

//             {/* Category + SEMIS */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <Field label="School Category"     value={data.schoolCategory}  fieldKey="schoolCategory"  status={checklist.schoolCategory}  onToggle={handleToggle} />
//               <Field label="School SEMIS / Code" value={data.schoolSemisCode} fieldKey="schoolSemisCode" status={checklist.schoolSemisCode} onToggle={handleToggle} />
//             </div>

//             {/* Class + Enrollment + GR No */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               <Field label="Studying in Class"   value={data.studyingInClass} fieldKey="studyingInClass" status={checklist.studyingInClass} onToggle={handleToggle} />
//               <Field label="Year of Enrollment"  value={data.enrollmentYear}  fieldKey="enrollmentYear"  status={checklist.enrollmentYear}  onToggle={handleToggle} />
//               <Field label="School GR No"        value={data.schoolGRNo}      fieldKey="schoolGRNo"      status={checklist.schoolGRNo}      onToggle={handleToggle} />
//             </div>

//             {/* Headmaster */}
//             <Field
//               label="Headmaster / Principal Name"
//               value={data.headmasterName}
//               fieldKey="headmasterName"
//               status={checklist.headmasterName}
//               onToggle={handleToggle}
//             />
//           </div>
//         </div>

//         {/* ── Previous School Records Card ── */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
//           <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-400 to-purple-500" />

//           <div className="p-6 sm:p-8">
//             {/* Section header */}
//             <div className="flex items-center gap-2 mb-5">
//               <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
//                 <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className="text-base font-bold text-gray-900">{previousClassLabel}</h2>
//                 <p className="text-xs text-gray-400">Each row must be reviewed individually</p>
//               </div>
//             </div>

//             {previousSchool.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-10 text-center">
//                 <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
//                   <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                 </div>
//                 <p className="text-sm text-gray-400 font-medium">No previous class records available</p>
//               </div>
//             ) : (
//               <>
//                 {/* ── Desktop Table ── */}
//                 <div className="hidden md:block rounded-xl overflow-hidden border border-gray-200">
//                   <table className="min-w-full border-collapse">
//                     <thead>
//                       <tr className="bg-gray-50 border-b border-gray-200">
//                         {tableColumns.map(({ label }) => (
//                           <th
//                             key={label}
//                             className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
//                           >
//                             {label}
//                           </th>
//                         ))}
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
//                           Admin Decision
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100">
//                       {previousSchool.map((record, index) => {
//                         const rowStatus = rowChecklist[index];
//                         return (
//                           <tr
//                             key={index}
//                             className={`transition-colors duration-200 ${
//                               rowStatus === "correct"
//                                 ? "bg-emerald-50"
//                                 : rowStatus === "wrong"
//                                 ? "bg-red-50"
//                                 : "bg-white hover:bg-gray-50"
//                             }`}
//                           >
//                             {tableColumns.map(({ key }) => (
//                               <td
//                                 key={key}
//                                 className={`px-4 py-3.5 text-sm whitespace-nowrap font-medium ${
//                                   rowStatus === "correct"
//                                     ? "text-emerald-800"
//                                     : rowStatus === "wrong"
//                                     ? "text-red-800"
//                                     : "text-gray-800"
//                                 }`}
//                               >
//                                 {key === "class" ? (
//                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
//                                     Class {record[key]}
//                                   </span>
//                                 ) : (
//                                   record[key] || "—"
//                                 )}
//                               </td>
//                             ))}
//                             <td className="px-4 py-3.5">
//                               {/* Inline correct/wrong toggle */}
//                               <div className="flex items-center gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() => handleRowToggle(index, "correct")}
//                                   className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full border transition-all duration-150 ${
//                                     rowStatus === "correct"
//                                       ? "bg-emerald-500 border-emerald-500 text-white shadow"
//                                       : "bg-white border-gray-300 text-gray-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50"
//                                   }`}
//                                 >
//                                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
//                                   </svg>
//                                   Correct
//                                 </button>
//                                 <button
//                                   type="button"
//                                   onClick={() => handleRowToggle(index, "wrong")}
//                                   className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full border transition-all duration-150 ${
//                                     rowStatus === "wrong"
//                                       ? "bg-red-500 border-red-500 text-white shadow"
//                                       : "bg-white border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-500 hover:bg-red-50"
//                                   }`}
//                                 >
//                                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
//                                   </svg>
//                                   Wrong
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* ── Mobile Cards ── */}
//                 <div className="md:hidden space-y-3">
//                   {previousSchool.map((record, index) => {
//                     const rowStatus = rowChecklist[index];
//                     return (
//                       <div
//                         key={index}
//                         className={`rounded-xl border-2 p-4 transition-all duration-200 ${
//                           rowStatus === "correct"
//                             ? "bg-emerald-50 border-emerald-300"
//                             : rowStatus === "wrong"
//                             ? "bg-red-50 border-red-300"
//                             : "bg-gray-50 border-gray-200"
//                         }`}
//                       >
//                         {/* Row header */}
//                         <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-gray-200">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
//                             Class {record.class}
//                           </span>
//                           <div className="flex items-center gap-2">
//                             <button
//                               type="button"
//                               onClick={() => handleRowToggle(index, "correct")}
//                               className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border transition-all ${
//                                 rowStatus === "correct"
//                                   ? "bg-emerald-500 border-emerald-500 text-white"
//                                   : "bg-white border-gray-300 text-gray-400 hover:border-emerald-400 hover:text-emerald-600"
//                               }`}
//                             >
//                               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
//                               </svg>
//                               Correct
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => handleRowToggle(index, "wrong")}
//                               className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border transition-all ${
//                                 rowStatus === "wrong"
//                                   ? "bg-red-500 border-red-500 text-white"
//                                   : "bg-white border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-500"
//                               }`}
//                             >
//                               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
//                               </svg>
//                               Wrong
//                             </button>
//                           </div>
//                         </div>

//                         {/* Row fields */}
//                         <div className="grid grid-cols-2 gap-3">
//                           {tableColumns.slice(1).map(({ label, key }) => (
//                             <div key={key}>
//                               <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{label}</p>
//                               <p className="text-sm font-medium text-gray-800">{record[key] || "—"}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {/* Row review hint */}
//                 <p className="text-xs text-gray-400 mt-4 text-center">
//                   {rowReviewedCount < previousSchool.length
//                     ? `${previousSchool.length - rowReviewedCount} row(s) still need a decision`
//                     : "✓ All rows reviewed"}
//                 </p>
//               </>
//             )}
//           </div>
//         </div>

//         {/* ── Navigation ── */}
//         <div className="flex items-center justify-between gap-4 flex-wrap">
//           <button
//             onClick={() => navigate(`/admin/applications/view-form-2?applicantID=${applicantID}`)}
//             className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-600 font-semibold text-sm hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
//             </svg>
//             Previous Step
//           </button>

//           <div className="flex items-center gap-3">
//             {!allReviewed && (
//               <p className="text-xs text-gray-400 font-medium">
//                 {totalReviewed}/{totalFields} fields reviewed
//               </p>
//             )}
//             <button
//               onClick={handleNext}
//               disabled={!allReviewed}
//               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
//                 allReviewed
//                   ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
//                   : "bg-gray-100 text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               Next Step
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// // import React, { useState } from "react";
// // import Button from "../../button";
// // import { useSearchParams, useNavigate } from "react-router-dom";
// // import { useGetApplicantSchoolInfo } from "../../../../api/client/admin";

// // const FIELD_LABELS = {
// //   schoolName:       "School Name",
// //   schoolCategory:   "School Category",
// //   schoolSemisCode:  "School SEMIS / Code",
// //   studyingInClass:  "Currently Studying in Class",
// //   enrollmentYear:   "Year of Enrollment",
// //   schoolGRNo:       "School GR No",
// //   headmasterName:   "Headmaster / Principal Name",
// // };

// // const FIELD_ERROR_MESSAGES = {
// //   schoolName:       "Invalid School Name — Must match official school records",
// //   schoolCategory:   "Invalid School Category — Must be correct category",
// //   schoolSemisCode:  "Invalid SEMIS Code — Must be a valid SEMIS/school code",
// //   studyingInClass:  "Invalid Class — Must match current enrollment records",
// //   enrollmentYear:   "Invalid Enrollment Year — Must match school records",
// //   schoolGRNo:       "Invalid GR No — Must match school general register",
// //   headmasterName:   "Invalid Headmaster Name — Must match official school records",
// // };

// // const FIELD_KEYS = Object.keys(FIELD_LABELS);

// // const StatusToggle = ({ fieldKey, status, onToggle }) => (
// //   <div className="flex items-center gap-2">
// //     <button
// //       type="button"
// //       onClick={() => onToggle(fieldKey, "correct")}
// //       className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border transition-all ${
// //         status === "correct"
// //           ? "bg-green-500 border-green-500 text-white"
// //           : "bg-white border-gray-300 text-gray-400 hover:border-green-400 hover:text-green-500"
// //       }`}
// //     >
// //       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
// //       </svg>
// //       Correct
// //     </button>
// //     <button
// //       type="button"
// //       onClick={() => onToggle(fieldKey, "wrong")}
// //       className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border transition-all ${
// //         status === "wrong"
// //           ? "bg-red-500 border-red-500 text-white"
// //           : "bg-white border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-500"
// //       }`}
// //     >
// //       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
// //       </svg>
// //       Wrong
// //     </button>
// //   </div>
// // );

// // const Field = ({ label, value, fieldKey, status, onToggle }) => (
// //   <div>
// //     <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
// //       <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
// //         {label}
// //       </p>
// //       <StatusToggle fieldKey={fieldKey} status={status} onToggle={onToggle} />
// //     </div>
// //     <p
// //       className={`text-sm font-medium text-gray-900 border rounded-lg px-3 sm:px-4 py-2.5 break-words transition-colors ${
// //         status === "correct"
// //           ? "bg-green-50 border-green-400"
// //           : status === "wrong"
// //           ? "bg-red-50 border-red-400"
// //           : "bg-gray-50 border-gray-200"
// //       }`}
// //     >
// //       {value || "—"}
// //     </p>
// //   </div>
// // );

// // export const Form3View = () => {
// //   const navigate = useNavigate();
// //   const [searchParams] = useSearchParams();
// //   const applicantID = searchParams.get("applicantID");

// //   const { data: response, previousSchool: schoolData, isLoading } = useGetApplicantSchoolInfo({ userId: applicantID });
// //   if (isLoading) return <p>Loading...</p>;

// //   const data = response?.[0] || {};
// //   const previousSchool = schoolData || [];

// //   // Field checklist
// //   const [checklist, setChecklist] = useState(
// //     Object.fromEntries(FIELD_KEYS.map((key) => [key, null]))
// //   );

// //   // Previous school rows checklist — keyed by row index
// //   const [rowChecklist, setRowChecklist] = useState(
// //     Object.fromEntries(previousSchool.map((_, i) => [i, null]))
// //   );

// //   const handleToggle = (fieldKey, value) => {
// //     const newStatus = checklist[fieldKey] === value ? null : value;
// //     setChecklist((prev) => ({ ...prev, [fieldKey]: newStatus }));
// //   };

// //   const handleRowToggle = (index, value) => {
// //     const newStatus = rowChecklist[index] === value ? null : value;
// //     setRowChecklist((prev) => ({ ...prev, [index]: newStatus }));
// //   };

// //   const fieldReviewedCount  = FIELD_KEYS.filter((key) => checklist[key] !== null).length;
// //   const rowReviewedCount    = Object.values(rowChecklist).filter((v) => v !== null).length;
// //   const totalFields         = FIELD_KEYS.length + previousSchool.length;
// //   const totalReviewed       = fieldReviewedCount + rowReviewedCount;
// //   const correctCount        = FIELD_KEYS.filter((k) => checklist[k] === "correct").length + Object.values(rowChecklist).filter((v) => v === "correct").length;
// //   const wrongCount          = FIELD_KEYS.filter((k) => checklist[k] === "wrong").length + Object.values(rowChecklist).filter((v) => v === "wrong").length;
// //   const allReviewed         = totalReviewed === totalFields;

// //   const handleNext = () => {
// //     if (!allReviewed) return;

// //     console.log("✅ Proceeding to next step:", {
// //       fieldChecklist: Object.fromEntries(FIELD_KEYS.map((key) => [FIELD_LABELS[key], checklist[key]])),
// //       previousSchoolRows: previousSchool.map((record, i) => ({
// //         class: `Class ${record.class}`,
// //         status: rowChecklist[i],
// //       })),
// //       wrongFields: FIELD_KEYS
// //         .filter((key) => checklist[key] === "wrong")
// //         .map((key) => ({ field: FIELD_LABELS[key], error: FIELD_ERROR_MESSAGES[key] })),
// //     });
// //     navigate(`/admin/applications/view-form-4?applicantID=${applicantID}`);
// //   };

// //   const previousClassLabel =
// //     data.studyingInClass === "Class 8" || data.studyingInClass === "8"
// //       ? "Previous Class Records (Class 5 to 7)"
// //       : data.studyingInClass === "Class 7" || data.studyingInClass === "7"
// //       ? "Previous Class Records (Class 4 to 6)"
// //       : "Previous Class Records";

// //   const tableColumns = [
// //     { label: "Class",          key: "class" },
// //     { label: "School Category", key: "schoolCategory" },
// //     { label: "SEMIS Code",     key: "semisCode" },
// //     { label: "District",       key: "district" },
// //     { label: "Year of Passing", key: "yearOfPassing" },
// //   ];

// //   return (
// //     <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 w-full">
// //       <div className="mb-6 sm:mb-8">
// //         <div className="flex flex-col gap-4 sm:gap-5">

// //           {/* Header */}
// //           <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg flex items-center justify-between flex-wrap gap-2">
// //             <p className="text-xs sm:text-sm text-blue-800 font-medium">
// //               School Information — View Only
// //             </p>
// //             <div className="flex items-center gap-2 text-xs font-semibold">
// //               <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ {correctCount} Correct</span>
// //               <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">✗ {wrongCount} Wrong</span>
// //               <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{totalReviewed}/{totalFields} Reviewed</span>
// //             </div>
// //           </div>

// //           {/* School Name */}
// //           <Field label="School Name" value={data.schoolName} fieldKey="schoolName" status={checklist.schoolName} onToggle={handleToggle} />

// //           {/* School Category + SEMIS Code */}
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
// //             <Field label="School Category"     value={data.schoolCategory} fieldKey="schoolCategory"  status={checklist.schoolCategory}  onToggle={handleToggle} />
// //             <Field label="School SEMIS / Code" value={data.schoolSemisCode} fieldKey="schoolSemisCode" status={checklist.schoolSemisCode} onToggle={handleToggle} />
// //           </div>

// //           {/* Class + Enrollment Year + GR No */}
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
// //             <Field label="Currently Studying in Class" value={data.studyingInClass} fieldKey="studyingInClass" status={checklist.studyingInClass} onToggle={handleToggle} />
// //             <Field label="Year of Enrollment"          value={data.enrollmentYear}  fieldKey="enrollmentYear"  status={checklist.enrollmentYear}  onToggle={handleToggle} />
// //             <Field label="School GR No"                value={data.schoolGRNo}      fieldKey="schoolGRNo"      status={checklist.schoolGRNo}      onToggle={handleToggle} />
// //           </div>

// //           {/* Headmaster Name */}
// //           <Field label="Headmaster / Principal Name" value={data.headmasterName} fieldKey="headmasterName" status={checklist.headmasterName} onToggle={handleToggle} />

// //           {/* Previous Class Records */}
// //           <div className="mt-2 sm:mt-4">
// //             <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
// //               {previousClassLabel}
// //             </h3>

// //             {previousSchool.length === 0 ? (
// //               <p className="text-sm text-gray-500 italic">No previous class records available.</p>
// //             ) : (
// //               <>
// //                 {/* Desktop Table */}
// //                 <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
// //                   <table className="min-w-full border-collapse">
// //                     <thead>
// //                       <tr className="bg-gray-100">
// //                         {tableColumns.map(({ label }) => (
// //                           <th key={label} className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap">
// //                             {label}
// //                           </th>
// //                         ))}
// //                         <th className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap">
// //                           Review
// //                         </th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {previousSchool.map((record, index) => (
// //                         <tr
// //                           key={index}
// //                           className={`transition-colors ${
// //                             rowChecklist[index] === "correct"
// //                               ? "bg-green-50"
// //                               : rowChecklist[index] === "wrong"
// //                               ? "bg-red-50"
// //                               : "even:bg-gray-50"
// //                           }`}
// //                         >
// //                           {tableColumns.map(({ key }) => (
// //                             <td key={key} className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-sm text-gray-800 whitespace-nowrap">
// //                               {key === "class" ? `Class ${record[key]}` : record[key] || "—"}
// //                             </td>
// //                           ))}
// //                           <td className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3">
// //                             <StatusToggle fieldKey={index} status={rowChecklist[index]} onToggle={handleRowToggle} />
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>

// //                 {/* Mobile Cards */}
// //                 <div className="md:hidden space-y-4">
// //                   {previousSchool.map((record, index) => (
// //                     <div
// //                       key={index}
// //                       className={`border rounded-lg p-4 transition-colors ${
// //                         rowChecklist[index] === "correct"
// //                           ? "bg-green-50 border-green-300"
// //                           : rowChecklist[index] === "wrong"
// //                           ? "bg-red-50 border-red-300"
// //                           : "bg-gray-50 border-gray-200"
// //                       }`}
// //                     >
// //                       <div className="mb-3 pb-2 border-b border-gray-200 flex items-center justify-between gap-2">
// //                         <span className="font-bold text-gray-800 text-sm">Class {record.class}</span>
// //                         <StatusToggle fieldKey={index} status={rowChecklist[index]} onToggle={handleRowToggle} />
// //                       </div>
// //                       <div className="grid grid-cols-1 gap-3">
// //                         {tableColumns.slice(1).map(({ label, key }) => (
// //                           <div key={key}>
// //                             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
// //                             <p className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-2 break-words">
// //                               {record[key] || "—"}
// //                             </p>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </>
// //             )}
// //           </div>

// //         </div>
// //       </div>

// //       {/* Navigation */}
// //       <div className="mt-4 flex items-center justify-between py-4 gap-4 flex-wrap">
// //         <Button
// //           onClick={() => navigate(`/admin/applications/view-form-2?applicantID=${applicantID}`)}
// //           type="button"
// //           className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
// //         >
// //           ← Previous Step
// //         </Button>

// //         <div className="flex items-center gap-3">
// //           {!allReviewed && (
// //             <p className="text-xs text-gray-400 font-medium">
// //               Please review all fields ({totalReviewed}/{totalFields})
// //             </p>
// //           )}
// //           <Button
// //             onClick={handleNext}
// //             type="button"
// //             disabled={!allReviewed}
// //             className={`px-4 py-2 font-bold rounded-lg shadow-lg transition-all duration-200 ${
// //               !allReviewed
// //                 ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
// //                 : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
// //             }`}
// //           >
// //             Next Step →
// //           </Button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };