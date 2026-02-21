import React, { useState } from "react";
import Button from "../../button";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetApplicantInfo } from "../../../../api/client/admin";

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

export const Form1View = () => {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const { data: studentInfo, isSuccess, isPending, isError, isLoading } = useGetApplicantInfo({ userId: applicantID })
  const data = studentInfo?.[0] || []

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 w-full">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:gap-5">

            {/* Header Badge */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
              <p className="text-xs sm:text-sm text-blue-800 font-medium">
                Student Information — View Only
              </p>
            </div>

            {/* Main content: photo on top for mobile, side-by-side on lg+ */}
            <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">

              {/* Photo — first on mobile, right column on desktop */}
              <div className="lg:col-span-1 lg:order-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                  Student Photo
                </p>

                {data?.fileUrl && (
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="
                        w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56
                        lg:w-full lg:h-auto lg:aspect-square
                        border-2 border-gray-200 rounded-lg overflow-hidden
                        cursor-pointer bg-gray-50 flex items-center justify-center
                        hover:border-blue-400 transition-colors
                      "
                    >
                      <img
                        src={data?.fileUrl}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Fields — below photo on mobile, left 2 columns on desktop */}
              <div className="lg:col-span-2 lg:order-1 flex flex-col gap-4 sm:gap-5">

                {/* Student Name — full width */}
                <Field
                  label="Student Name (As per NADRA B-Form)"
                  value={data.studentName}
                />

                {/* Row: Gender + B-Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <Field
                    label="Gender"
                    value={data.gender}
                  />
                  <Field
                    label="B-Form Number"
                    value={data.noBForm ? "No B-Form" : data.studentBForm}
                  />
                </div>

                {/* Row: Date of Birth + Religion */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <Field
                    label="Date of Birth"
                    value={
                      data.dob
                        ? new Date(data.dob).toLocaleDateString("en-PK", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                        : "—"
                    }
                  />
                  <Field
                    label="Religion"
                    value={data.religion}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex py-4">
          <Button
            onClick={() => navigate(`/admin/applications/view-form-2?applicantID=${applicantID}`)}
            type="button"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Next Step →
          </Button>
        </div>
      </div>

      {/* Photo Enlarge Modal */}
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
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={data.photoPreview}
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