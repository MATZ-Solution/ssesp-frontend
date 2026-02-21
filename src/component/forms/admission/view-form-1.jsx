import React, { useState } from "react";
import Button from "../../button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetApplicantInfo } from "../../../../api/client/admin";

const FIELD_KEYS = ["studentName", "gender", "bForm", "dateOfBirth", "religion", "studentPhoto"];

const FIELD_LABELS = {
  studentName:  "Student Name",
  gender:       "Gender",
  bForm:        "B-Form Number",
  dateOfBirth:  "Date of Birth",
  religion:     "Religion",
  studentPhoto: "Student Photo",
};

const FIELD_ERROR_MESSAGES = {
  studentName:  "Invalid Student Name — Must match NADRA B-Form exactly",
  gender:       "Invalid Gender — Must be Male or Female as per records",
  bForm:        "Invalid B-Form Number — Must be a valid NADRA B-Form number",
  dateOfBirth:  "Invalid Date of Birth — Must match NADRA B-Form records",
  religion:     "Invalid Religion — Entry does not match official records",
  studentPhoto: "Invalid Photograph — Must be a clear photo in blue or white background",
};

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

export const Form1View = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const { data: studentInfo, isLoading } = useGetApplicantInfo({ userId: applicantID });
  const data = studentInfo?.[0] || [];

  const [checklist, setChecklist] = useState(
    Object.fromEntries(FIELD_KEYS.map((key) => [key, null]))
  );

  const handleToggle = (fieldKey, value) => {
    const newStatus = checklist[fieldKey] === value ? null : value;
    setChecklist((prev) => ({ ...prev, [fieldKey]: newStatus }));
  };

  const allReviewed   = FIELD_KEYS.every((key) => checklist[key] !== null);
  const correctCount  = FIELD_KEYS.filter((key) => checklist[key] === "correct").length;
  const wrongCount    = FIELD_KEYS.filter((key) => checklist[key] === "wrong").length;
  const reviewedCount = FIELD_KEYS.filter((key) => checklist[key] !== null).length;

  const handleNext = () => {
    if (!allReviewed) return;

    console.log("✅ Proceeding to next step:", {
      fullChecklist: Object.fromEntries(
        FIELD_KEYS.map((key) => [FIELD_LABELS[key], checklist[key]])
      ),
      wrongFields: FIELD_KEYS
        .filter((key) => checklist[key] === "wrong")
        .map((key) => ({ field: FIELD_LABELS[key], error: FIELD_ERROR_MESSAGES[key] })),
    });
    navigate(`/admin/applications/view-form-2?applicantID=${applicantID}`);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 w-full">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:gap-5">

            {/* Header */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg flex items-center justify-between flex-wrap gap-2">
              <p className="text-xs sm:text-sm text-blue-800 font-medium">
                Student Information — View Only
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ {correctCount} Correct</span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">✗ {wrongCount} Wrong</span>
                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{reviewedCount}/{FIELD_KEYS.length} Reviewed</span>
              </div>
            </div>

            {/* Main content */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">

              {/* Photo */}
              <div className="lg:col-span-1 lg:order-2">
                <div className="flex items-center justify-between mb-1.5 gap-2 flex-wrap">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Student Photo
                  </p>
                  <StatusToggle
                    fieldKey="studentPhoto"
                    status={checklist.studentPhoto}
                    onToggle={handleToggle}
                  />
                </div>

                {data?.fileUrl && (
                  <div
                    onClick={() => setShowPhotoModal(true)}
                    className={`
                      w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56
                      lg:w-full lg:h-auto lg:aspect-square
                      border-2 rounded-lg overflow-hidden cursor-pointer
                      bg-gray-50 flex items-center justify-center transition-colors
                      ${
                        checklist.studentPhoto === "correct"
                          ? "border-green-400"
                          : checklist.studentPhoto === "wrong"
                          ? "border-red-400"
                          : "border-gray-200 hover:border-blue-400"
                      }
                    `}
                  >
                    <img src={data?.fileUrl} alt="Student" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Fields */}
              <div className="lg:col-span-2 lg:order-1 flex flex-col gap-4 sm:gap-5">

                <Field
                  label="Student Name (As per NADRA B-Form)"
                  value={data.studentName}
                  fieldKey="studentName"
                  status={checklist.studentName}
                  onToggle={handleToggle}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <Field label="Gender"        value={data.gender}                                    fieldKey="gender" status={checklist.gender} onToggle={handleToggle} />
                  <Field label="B-Form Number" value={data.noBForm ? "No B-Form" : data.studentBForm} fieldKey="bForm"  status={checklist.bForm}  onToggle={handleToggle} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <Field
                    label="Date of Birth"
                    value={
                      data.dob
                        ? new Date(data.dob).toLocaleDateString("en-PK", { day: "2-digit", month: "long", year: "numeric" })
                        : "—"
                    }
                    fieldKey="dateOfBirth"
                    status={checklist.dateOfBirth}
                    onToggle={handleToggle}
                  />
                  <Field label="Religion" value={data.religion} fieldKey="religion" status={checklist.religion} onToggle={handleToggle} />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex items-center gap-3 py-4">
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
          {!allReviewed && (
            <p className="text-xs text-gray-400 font-medium">
              Please review all fields before proceeding ({reviewedCount}/{FIELD_KEYS.length})
            </p>
          )}
        </div>
      </div>

      {/* Photo Modal */}
      {showPhotoModal && data?.fileUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPhotoModal(false)}
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white text-gray-800 rounded-full p-1.5 sm:p-2 hover:bg-gray-100 shadow-lg z-10"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={data.fileUrl}
              alt="Student photo enlarged"
              className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};