import React from "react";
import Button from "../../button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetApplicantSchoolInfo } from "../../../../api/client/admin";

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

export const Form3View = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");

  const { data: response, previousSchool: schoolData, isLoading } = useGetApplicantSchoolInfo({userId: applicantID});
  if (isLoading) return <p>Loading...</p>;

  const data = response?.[0] || {};
  const previousSchool = schoolData || [];

  const fullWidthFields = [
    { label: "School Name", value: data.schoolName },
    { label: "Headmaster / Principal Name", value: data.headmasterName },
  ];

  const topRowFields = [
    { label: "School Category", value: data.schoolCategory },
    { label: "School SEMIS / Code", value: data.schoolSemisCode },
  ];

  const midRowFields = [
    { label: "Currently Studying in Class", value: data.studyingInClass },
    { label: "Year of Enrollment", value: data.enrollmentYear },
    { label: "School GR No", value: data.schoolGRNo },
  ];

  const previousClassLabel =
    data.studyingInClass === "Class 8" || data.studyingInClass === "8"
      ? "Previous Class Records (Class 5 to 7)"
      : data.studyingInClass === "Class 7" || data.studyingInClass === "7"
        ? "Previous Class Records (Class 4 to 6)"
        : "Previous Class Records";

  const tableColumns = [
    { label: "Class", key: "class" },
    { label: "School Category", key: "schoolCategory" },
    { label: "SEMIS Code", key: "semisCode" },
    { label: "District", key: "district" },
    { label: "Year of Passing", key: "yearOfPassing" },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-4 sm:gap-5">

          {/* Header Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
            <p className="text-xs sm:text-sm text-blue-800 font-medium">
              School Information — View Only
            </p>
          </div>

          {/* School Name — full width */}
          {fullWidthFields.slice(0, 1).map(({ label, value }) => (
            <Field key={label} label={label} value={value} />
          ))}

          {/* School Category + SEMIS Code */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {topRowFields.map(({ label, value }) => (
              <Field key={label} label={label} value={value} />
            ))}
          </div>

          {/* Class + Enrollment Year + GR No */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {midRowFields.map(({ label, value }) => (
              <Field key={label} label={label} value={value} />
            ))}
          </div>

          {/* Headmaster Name — full width */}
          {fullWidthFields.slice(1).map(({ label, value }) => (
            <Field key={label} label={label} value={value} />
          ))}

          {/* Previous Class Records */}
          <div className="mt-2 sm:mt-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
              {previousClassLabel}
            </h3>

            {previousSchool.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                No previous class records available.
              </p>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        {tableColumns.map(({ label }) => (
                          <th
                            key={label}
                            className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap"
                          >
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {previousSchool.map((record, index) => (
                        <tr key={index} className="even:bg-gray-50">
                          {tableColumns.map(({ key }) => (
                            <td
                              key={key}
                              className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-sm text-gray-800 whitespace-nowrap"
                            >
                              {key === "class"
                                ? `Class ${record[key]}`
                                : record[key] || "—"}
                            </td>
                          ))}
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
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="mb-3 pb-2 border-b border-gray-200">
                        <span className="font-bold text-gray-800 text-sm">
                          Class {record.class}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {tableColumns.slice(1).map(({ label, key }) => (
                          <div key={key}>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
                              {label}
                            </p>
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

      {/* Next Button */}
      <div className="mt-4 flex items-center justify-between py-4">
        <Button
          onClick={() => navigate(`/admin/applications/view-form-2?applicantID=${applicantID}`)}
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Previous Step →
        </Button>
        <Button
          onClick={() => navigate(`/admin/applications/view-form-4?applicantID=${applicantID}`)}
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Next Step →
        </Button>
      </div>
    </div>
  );
};