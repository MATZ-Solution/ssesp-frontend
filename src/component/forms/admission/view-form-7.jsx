import React from "react";
import Button from "../../button";

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
      {label}
    </p>
    <p className="text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 break-words">
      {value || "—"}
    </p>
  </div>
);

export const Form3View = ({ data = {}, handleTitle }) => {
  const fullWidthFields = [
    {
      label: "Postal Address",
      value: data.postalAddress,
    },
  ];

  const halfWidthFields = [
    {
      label: "Division",
      value: data.division?.label || data.division || null,
    },
    {
      label: "District",
      value: data.district?.label || data.district || null,
    },
  ];

  return (
    <div className="bg-white px-4 sm:px-6 md:px-8 lg:px-10 w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-4 sm:gap-5">

          {/* Header Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
            <p className="text-xs sm:text-sm text-blue-800 font-medium">
              Address Information — View Only
            </p>
          </div>

          {/* Full-width fields */}
          {fullWidthFields.map(({ label, value }) => (
            <Field key={label} label={label} value={value} />
          ))}

          {/* Half-width fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {halfWidthFields.map(({ label, value }) => (
              <Field key={label} label={label} value={value} />
            ))}
          </div>

        </div>
      </div>

      {/* Next Button */}
      <div className="flex py-4">
        <Button
          onClick={() => handleTitle("School Information")}
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Next Step →
        </Button>
      </div>
    </div>
  );
};