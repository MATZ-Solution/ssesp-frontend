import React, { useState } from "react";
import Button from "../../button";

const PdfIcon = () => (
  <svg className="w-12 h-12 text-red-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    />
  </svg>
);

const DocumentViewItem = ({ label, description, preview }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 shadow-sm">
      {/* Label */}
      <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>
      {description && (
        <p className="text-xs text-gray-500 mb-3">{description}</p>
      )}

      {/* Preview Box */}
      <div
        className={`w-full h-44 sm:h-48 rounded-lg border-2 flex items-center justify-center overflow-hidden
          ${preview
            ? preview.type === "pdf"
              ? "border-red-200 bg-red-50"
              : "border-green-200 bg-green-50 cursor-pointer hover:border-blue-400 transition-colors"
            : "border-dashed border-gray-200 bg-gray-50"
          }`}
        onClick={() => {
          if (preview?.type === "image") setShowModal(true);
        }}
      >
        {preview ? (
          preview.type === "pdf" ? (
            <div className="flex flex-col items-center justify-center text-center px-3">
              <PdfIcon />
              <p className="text-sm font-medium text-gray-700 break-all">{preview.name}</p>
              <p className="text-xs text-gray-400 mt-1">PDF Document</p>
            </div>
          ) : (
            <img
              src={preview.url}
              alt={label}
              className="w-full h-full object-contain"
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center text-center px-3">
            <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xs text-gray-400">No document uploaded</p>
          </div>
        )}
      </div>

      {/* Uploaded badge */}
      {preview && (
        <div className="mt-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
          <p className="text-xs text-green-700 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd" />
            </svg>
            Document uploaded
            {preview.type === "image" && (
              <span className="text-green-600 ml-1">· Tap to enlarge</span>
            )}
          </p>
        </div>
      )}

      {/* Image Modal */}
      {showModal && preview?.type === "image" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white text-gray-800 rounded-full p-1.5 sm:p-2 hover:bg-gray-100 shadow-lg z-10"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={preview.url}
              alt={`${label} enlarged`}
              className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Form5View = ({ data = {}, handleTitle }) => {
  const documents = [
    {
      name: "document1",
      label: "Birth Certificate (B-Form)",
      description: "Student's NADRA B-Form or Birth Certificate",
      preview: data.doc1Preview || null,
    },
    {
      name: "document2",
      label: "Parent/Guardian Domicile",
      description: "Copy of parent or guardian's Domicile",
      preview: data.doc2Preview || null,
    },
    {
      name: "document3",
      label: "Parent/Guardian CNIC",
      description: "Copy of parent or guardian's CNIC",
      preview: data.doc3Preview || null,
    },
    {
      name: "document4",
      label: "Parent/Guardian PRC",
      description: "Copy of parent or guardian's PRC",
      preview: data.doc4Preview || null,
    },
  ];

  return (
    <div className="bg-white px-4 sm:px-6 md:px-8 lg:px-10 w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-4 sm:gap-5">

          {/* Header Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
            <p className="text-xs sm:text-sm text-blue-800 font-medium">
              Document Uploads — View Only
            </p>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {documents.map(({ name, label, description, preview }) => (
              <DocumentViewItem
                key={name}
                label={label}
                description={description}
                preview={preview}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Next Button */}
      <div className="flex py-4">
        <Button
          onClick={() => handleTitle("School Preference Information")}
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Next Step →
        </Button>
      </div>
    </div>
  );
};

export default Form5View;