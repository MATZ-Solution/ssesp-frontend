import React, { useState } from "react";
import Button from "../../button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetApplicantSchoolInfo } from "../../../../api/client/admin";

const FIELD_LABELS = {
  schoolName:       "School Name",
  schoolCategory:   "School Category",
  schoolSemisCode:  "School SEMIS / Code",
  studyingInClass:  "Currently Studying in Class",
  enrollmentYear:   "Year of Enrollment",
  schoolGRNo:       "School GR No",
  headmasterName:   "Headmaster / Principal Name",
};

const FIELD_ERROR_MESSAGES = {
  schoolName:       "Invalid School Name — Must match official school records",
  schoolCategory:   "Invalid School Category — Must be correct category",
  schoolSemisCode:  "Invalid SEMIS Code — Must be a valid SEMIS/school code",
  studyingInClass:  "Invalid Class — Must match current enrollment records",
  enrollmentYear:   "Invalid Enrollment Year — Must match school records",
  schoolGRNo:       "Invalid GR No — Must match school general register",
  headmasterName:   "Invalid Headmaster Name — Must match official school records",
};

const FIELD_KEYS = Object.keys(FIELD_LABELS);

const StatusToggle = ({ fieldKey, status, onToggle }) => (
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={() => onToggle(fieldKey, "correct")}
      className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border transition-all ${
        status === "correct"
          ? "bg-green-500 border-green-500 text-white"
          : "bg-white border-gray-300 text-gray-400 hover:border-green-400 hover:text-green-500"
      }`}
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
      </svg>
      Correct
    </button>
    <button
      type="button"
      onClick={() => onToggle(fieldKey, "wrong")}
      className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full border transition-all ${
        status === "wrong"
          ? "bg-red-500 border-red-500 text-white"
          : "bg-white border-gray-300 text-gray-400 hover:border-red-400 hover:text-red-500"
      }`}
    >
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
      </svg>
      Wrong
    </button>
  </div>
);

const Field = ({ label, value, fieldKey, status, onToggle }) => (
  <div>
    <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </p>
      <StatusToggle fieldKey={fieldKey} status={status} onToggle={onToggle} />
    </div>
    <p
      className={`text-sm font-medium text-gray-900 border rounded-lg px-3 sm:px-4 py-2.5 break-words transition-colors ${
        status === "correct"
          ? "bg-green-50 border-green-400"
          : status === "wrong"
          ? "bg-red-50 border-red-400"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      {value || "—"}
    </p>
  </div>
);

export const Form3View = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");

  const { data: response, previousSchool: schoolData, isLoading } = useGetApplicantSchoolInfo({ userId: applicantID });
  if (isLoading) return <p>Loading...</p>;

  const data = response?.[0] || {};
  const previousSchool = schoolData || [];

  // Field checklist
  const [checklist, setChecklist] = useState(
    Object.fromEntries(FIELD_KEYS.map((key) => [key, null]))
  );

  // Previous school rows checklist — keyed by row index
  const [rowChecklist, setRowChecklist] = useState(
    Object.fromEntries(previousSchool.map((_, i) => [i, null]))
  );

  const handleToggle = (fieldKey, value) => {
    const newStatus = checklist[fieldKey] === value ? null : value;
    setChecklist((prev) => ({ ...prev, [fieldKey]: newStatus }));
  };

  const handleRowToggle = (index, value) => {
    const newStatus = rowChecklist[index] === value ? null : value;
    setRowChecklist((prev) => ({ ...prev, [index]: newStatus }));
  };

  const fieldReviewedCount  = FIELD_KEYS.filter((key) => checklist[key] !== null).length;
  const rowReviewedCount    = Object.values(rowChecklist).filter((v) => v !== null).length;
  const totalFields         = FIELD_KEYS.length + previousSchool.length;
  const totalReviewed       = fieldReviewedCount + rowReviewedCount;
  const correctCount        = FIELD_KEYS.filter((k) => checklist[k] === "correct").length + Object.values(rowChecklist).filter((v) => v === "correct").length;
  const wrongCount          = FIELD_KEYS.filter((k) => checklist[k] === "wrong").length + Object.values(rowChecklist).filter((v) => v === "wrong").length;
  const allReviewed         = totalReviewed === totalFields;

  const handleNext = () => {
    if (!allReviewed) return;

    console.log("✅ Proceeding to next step:", {
      fieldChecklist: Object.fromEntries(FIELD_KEYS.map((key) => [FIELD_LABELS[key], checklist[key]])),
      previousSchoolRows: previousSchool.map((record, i) => ({
        class: `Class ${record.class}`,
        status: rowChecklist[i],
      })),
      wrongFields: FIELD_KEYS
        .filter((key) => checklist[key] === "wrong")
        .map((key) => ({ field: FIELD_LABELS[key], error: FIELD_ERROR_MESSAGES[key] })),
    });
    navigate(`/admin/applications/view-form-4?applicantID=${applicantID}`);
  };

  const previousClassLabel =
    data.studyingInClass === "Class 8" || data.studyingInClass === "8"
      ? "Previous Class Records (Class 5 to 7)"
      : data.studyingInClass === "Class 7" || data.studyingInClass === "7"
      ? "Previous Class Records (Class 4 to 6)"
      : "Previous Class Records";

  const tableColumns = [
    { label: "Class",          key: "class" },
    { label: "School Category", key: "schoolCategory" },
    { label: "SEMIS Code",     key: "semisCode" },
    { label: "District",       key: "district" },
    { label: "Year of Passing", key: "yearOfPassing" },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-4 sm:gap-5">

          {/* Header */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs sm:text-sm text-blue-800 font-medium">
              School Information — View Only
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ {correctCount} Correct</span>
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">✗ {wrongCount} Wrong</span>
              <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{totalReviewed}/{totalFields} Reviewed</span>
            </div>
          </div>

          {/* School Name */}
          <Field label="School Name" value={data.schoolName} fieldKey="schoolName" status={checklist.schoolName} onToggle={handleToggle} />

          {/* School Category + SEMIS Code */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <Field label="School Category"     value={data.schoolCategory} fieldKey="schoolCategory"  status={checklist.schoolCategory}  onToggle={handleToggle} />
            <Field label="School SEMIS / Code" value={data.schoolSemisCode} fieldKey="schoolSemisCode" status={checklist.schoolSemisCode} onToggle={handleToggle} />
          </div>

          {/* Class + Enrollment Year + GR No */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <Field label="Currently Studying in Class" value={data.studyingInClass} fieldKey="studyingInClass" status={checklist.studyingInClass} onToggle={handleToggle} />
            <Field label="Year of Enrollment"          value={data.enrollmentYear}  fieldKey="enrollmentYear"  status={checklist.enrollmentYear}  onToggle={handleToggle} />
            <Field label="School GR No"                value={data.schoolGRNo}      fieldKey="schoolGRNo"      status={checklist.schoolGRNo}      onToggle={handleToggle} />
          </div>

          {/* Headmaster Name */}
          <Field label="Headmaster / Principal Name" value={data.headmasterName} fieldKey="headmasterName" status={checklist.headmasterName} onToggle={handleToggle} />

          {/* Previous Class Records */}
          <div className="mt-2 sm:mt-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
              {previousClassLabel}
            </h3>

            {previousSchool.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No previous class records available.</p>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        {tableColumns.map(({ label }) => (
                          <th key={label} className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap">
                            {label}
                          </th>
                        ))}
                        <th className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap">
                          Review
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {previousSchool.map((record, index) => (
                        <tr
                          key={index}
                          className={`transition-colors ${
                            rowChecklist[index] === "correct"
                              ? "bg-green-50"
                              : rowChecklist[index] === "wrong"
                              ? "bg-red-50"
                              : "even:bg-gray-50"
                          }`}
                        >
                          {tableColumns.map(({ key }) => (
                            <td key={key} className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-sm text-gray-800 whitespace-nowrap">
                              {key === "class" ? `Class ${record[key]}` : record[key] || "—"}
                            </td>
                          ))}
                          <td className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3">
                            <StatusToggle fieldKey={index} status={rowChecklist[index]} onToggle={handleRowToggle} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                  {previousSchool.map((record, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 transition-colors ${
                        rowChecklist[index] === "correct"
                          ? "bg-green-50 border-green-300"
                          : rowChecklist[index] === "wrong"
                          ? "bg-red-50 border-red-300"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="mb-3 pb-2 border-b border-gray-200 flex items-center justify-between gap-2">
                        <span className="font-bold text-gray-800 text-sm">Class {record.class}</span>
                        <StatusToggle fieldKey={index} status={rowChecklist[index]} onToggle={handleRowToggle} />
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {tableColumns.slice(1).map(({ label, key }) => (
                          <div key={key}>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">{label}</p>
                            <p className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg px-3 py-2 break-words">
                              {record[key] || "—"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-between py-4 gap-4 flex-wrap">
        <Button
          onClick={() => navigate(`/admin/applications/view-form-2?applicantID=${applicantID}`)}
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          ← Previous Step
        </Button>

        <div className="flex items-center gap-3">
          {!allReviewed && (
            <p className="text-xs text-gray-400 font-medium">
              Please review all fields ({totalReviewed}/{totalFields})
            </p>
          )}
          <Button
            onClick={handleNext}
            type="button"
            disabled={!allReviewed}
            className={`px-4 py-2 font-bold rounded-lg shadow-lg transition-all duration-200 ${
              !allReviewed
                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
            }`}
          >
            Next Step →
          </Button>
        </div>
      </div>
    </div>
  );
};