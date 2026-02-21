import React, { useState } from "react";
import Button from "../../button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetApplicantGuardianInfo } from "../../../../api/client/admin";

const FIELD_LABELS = {
  guardianName:             "Name (Father/Guardian)",
  guardianCNIC:             "CNIC (Father/Guardian)",
  guardianDomicileDistrict: "District of Domicile (Father/Guardian)",
  guardianProfession:       "Profession (Father/Guardian)",
  guardianannualIncome:     "Annual Income (Father/Guardian)",
  relation:                 "Relation (Guardian)",
  guardianContactNumber:    "Phone Number",
  guardianWhatsApp:         "WhatsApp Number",
  siblingsUnderSef:         "Siblings Under SEF Scholarship",
  noSiblingsUnderSef:       "Number of Siblings Under SEF",
};

const FIELD_ERROR_MESSAGES = {
  guardianName:             "Invalid Name — Must match official CNIC records",
  guardianCNIC:             "Invalid CNIC — Must be a valid 13-digit NADRA CNIC",
  guardianDomicileDistrict: "Invalid District — Must match domicile certificate",
  guardianProfession:       "Invalid Profession — Entry does not match official records",
  guardianannualIncome:     "Invalid Annual Income — Must be a valid PKR amount",
  relation:                 "Invalid Relation — Must specify correct guardian relation",
  guardianContactNumber:    "Invalid Phone Number — Must be a valid Pakistani number",
  guardianWhatsApp:         "Invalid WhatsApp Number — Must be a valid Pakistani number",
  siblingsUnderSef:         "Invalid Entry — Must be Yes or No",
  noSiblingsUnderSef:       "Invalid Number — Must match actual siblings count",
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

export const Form2View = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");
  const { data: guardianInfo, isLoading } = useGetApplicantGuardianInfo({ userId: applicantID });
  const data = guardianInfo?.[0] || [];

  const hasSiblings = data.siblings_under_sef === "yes";

  // Build field keys dynamically based on whether siblings field is shown
  const getFieldKeys = () => {
    const keys = [
      "guardianName", "guardianCNIC", "guardianDomicileDistrict",
      "guardianProfession", "guardianannualIncome", "relation",
      "guardianContactNumber", "guardianWhatsApp", "siblingsUnderSef",
    ];
    if (hasSiblings) keys.push("noSiblingsUnderSef");
    return keys;
  };

  const FIELD_KEYS = getFieldKeys();

  const [checklist, setChecklist] = useState(
    Object.fromEntries(Object.keys(FIELD_LABELS).map((key) => [key, null]))
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
    navigate(`/admin/applications/view-form-3?applicantID=${applicantID}`);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 w-full">
      <div className="flex flex-col gap-4 sm:gap-5">

        {/* Header */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs sm:text-sm text-blue-800 font-medium">
            Father / Guardian Information — View Only
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ {correctCount} Correct</span>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">✗ {wrongCount} Wrong</span>
            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{reviewedCount}/{FIELD_KEYS.length} Reviewed</span>
          </div>
        </div>

        {/* Guardian Name */}
        <Field label="Name (Father/Guardian)" value={data.guardianName} fieldKey="guardianName" status={checklist.guardianName} onToggle={handleToggle} />

        {/* CNIC + District */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Field label="CNIC (Father/Guardian)"                  value={data.guardianCNIC}             fieldKey="guardianCNIC"             status={checklist.guardianCNIC}             onToggle={handleToggle} />
          <Field label="District of Domicile (Father/Guardian)"  value={data.guardianDomicileDistrict} fieldKey="guardianDomicileDistrict"  status={checklist.guardianDomicileDistrict} onToggle={handleToggle} />
        </div>

        {/* Profession + Annual Income */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Field label="Profession (Father/Guardian)"    value={data.guardianProfession} fieldKey="guardianProfession"   status={checklist.guardianProfession}   onToggle={handleToggle} />
          <Field
            label="Annual Income (Father/Guardian)"
            value={data.guardianannualIncome ? `PKR ${Number(data.guardianannualIncome).toLocaleString()}` : "—"}
            fieldKey="guardianannualIncome"
            status={checklist.guardianannualIncome}
            onToggle={handleToggle}
          />
        </div>

        {/* Relation + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Field label="Relation (Guardian)" value={data.relation}                   fieldKey="relation"            status={checklist.relation}            onToggle={handleToggle} />
          <Field label="Phone Number"        value={data.guardianContactNumber}       fieldKey="guardianContactNumber" status={checklist.guardianContactNumber} onToggle={handleToggle} />
        </div>

        {/* WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <Field label="WhatsApp Number" value={data.guardianContactWhattsappNumber} fieldKey="guardianWhatsApp" status={checklist.guardianWhatsApp} onToggle={handleToggle} />
        </div>

        {/* Siblings Under SEF */}
        <Field
          label="Siblings Under SEF Scholarship"
          value={data.siblings_under_sef === "yes" ? "Yes" : data.siblings_under_sef === "no" ? "No" : "—"}
          fieldKey="siblingsUnderSef"
          status={checklist.siblingsUnderSef}
          onToggle={handleToggle}
        />

        {/* Conditional: Number of siblings */}
        {hasSiblings && (
          <Field
            label="Number of Siblings Under SEF"
            value={data.no_siblings_under_sef ? String(data.no_siblings_under_sef) : "—"}
            fieldKey="noSiblingsUnderSef"
            status={checklist.noSiblingsUnderSef}
            onToggle={handleToggle}
          />
        )}

      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex items-center justify-between py-4 gap-4 flex-wrap">
        <Button
          onClick={() => navigate(`/admin/applications/view-form-1?applicantID=${applicantID}`)}
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          ← Previous Step
        </Button>

        <div className="flex items-center gap-3">
          {!allReviewed && (
            <p className="text-xs text-gray-400 font-medium">
              Please review all fields ({reviewedCount}/{FIELD_KEYS.length})
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