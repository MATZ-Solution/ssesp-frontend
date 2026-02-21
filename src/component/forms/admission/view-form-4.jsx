import React, { useState } from "react";
import Button from "../../button";
import { useGetApplicantDocument } from "../../../../api/client/admin";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// ✅ Required worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// ─── Detect PDF ────────────────────────────────────────────────────────────
const isPDF = (url) => {
  if (!url) return false;
  return (
    url.toLowerCase().includes(".pdf") ||
    url.toLowerCase().includes("application/pdf")
  );
};

// ─── Document Item Card ────────────────────────────────────────────────────
const DocumentViewItem = ({ label, description, preview }) => {
  const [showModal, setShowModal] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const isFilePDF = isPDF(preview);

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
            ? "border-green-200 bg-green-50 cursor-pointer hover:border-blue-400 transition-colors"
            : "border-dashed border-gray-200 bg-gray-50"
          }`}
        onClick={() => { if (preview) setShowModal(true); }}
      >
        {preview ? (
          isFilePDF ? (
            // ✅ Renders first page of PDF as thumbnail
            <Document
              file={preview}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={
                <div className="flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-gray-400">Loading PDF...</p>
                </div>
              }
              error={
                <div className="flex flex-col items-center gap-1 px-3 text-center">
                  <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                  </svg>
                  <p className="text-xs text-gray-500">PDF — Click to view</p>
                </div>
              }
            >
              <Page
                pageNumber={1}
                height={176}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          ) : (
            // ✅ Image preview (unchanged)
            <img
              src={preview}
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

      {/* Uploaded Badge */}
      {preview && (
        <div className="mt-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
          <p className="text-xs text-green-700 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd" />
            </svg>
            Document uploaded · <span className="text-green-600">Tap to enlarge</span>
          </p>
        </div>
      )}

      {/* Modal — same for both, PDF gets page controls */}
      {showModal && preview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-4xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white text-gray-800 rounded-full p-1.5 sm:p-2 hover:bg-gray-100 shadow-lg z-10"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {isFilePDF ? (
              <>
                {/* ✅ Full PDF in modal */}
                <div className="bg-white rounded-lg shadow-2xl overflow-auto max-h-[85vh] w-full flex justify-center">
                  <Document
                    file={preview}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    loading={
                      <div className="flex items-center justify-center h-40">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    }
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={Math.min(window.innerWidth * 0.85, 800)}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                </div>

                {/* Page Controls — only shown if PDF has multiple pages */}
                {numPages && numPages > 1 && (
                  <div className="mt-3 flex items-center gap-4 bg-white rounded-full px-4 py-2 shadow-lg">
                    <button
                      onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                      disabled={pageNumber <= 1}
                      className="text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="text-sm font-medium text-gray-700">
                      Page {pageNumber} of {numPages}
                    </span>
                    <button
                      onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                      disabled={pageNumber >= numPages}
                      className="text-gray-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              // ✅ Image modal (unchanged from your original)
              <img
                src={preview}
                alt={`${label} enlarged`}
                className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Form5View (unchanged) ────────────────────────────────────────────
const Form5View = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");
  const { data: documentInfo, isLoading } = useGetApplicantDocument({ userId: applicantID });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent" />
        </div>
        <p className="mt-4 text-sm text-gray-500">Loading documents...</p>
      </div>
    );
  }

  const documents = [
    {
      name: "document1",
      label: "Birth Certificate (B-Form)",
      description: "Student's NADRA B-Form or Birth Certificate",
      preview: documentInfo?.find((item) => item.documentName === "Birth Certificate")?.fileUrl || null,
    },
    {
      name: "document2",
      label: "Parent/Guardian Domicile",
      description: "Copy of parent or guardian's Domicile",
      preview: documentInfo?.find((item) => item.documentName === "Guardian Doimicile")?.fileUrl || null,
    },
    {
      name: "document3",
      label: "Parent/Guardian CNIC",
      description: "Copy of parent or guardian's CNIC",
      preview: documentInfo?.find((item) => item.documentName === "Guardian CNIC")?.fileUrl || null,
    },
    {
      name: "document4",
      label: "Parent/Guardian PRC",
      description: "Copy of parent or guardian's PRC",
      preview: documentInfo?.find((item) => item.documentName === "Guardian PRC")?.fileUrl || null,
    },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-10 w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-4 sm:gap-5">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
            <p className="text-xs sm:text-sm text-blue-800 font-medium">
              Document Uploads — View Only
            </p>
          </div>
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

      <div className="mt-4 flex items-center justify-between py-4">
        <Button
          onClick={() => navigate(`/admin/applications/view-form-3?applicantID=${applicantID}`)}
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          ← Previous Step
        </Button>
        <Button
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Form5View;