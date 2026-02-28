import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const BASE_URL = import.meta.env.VITE_CDN_URL || "";

const isPDF = (url) => {
  if (!url) return false;
  return (
    url.toLowerCase().includes(".pdf") ||
    url.toLowerCase().includes("application/pdf")
  );
};

// ─────────────────────────────────────────────
// Document Modal
// ─────────────────────────────────────────────
const DocumentModal = ({ preview, label, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const isFilePDF = isPDF(preview);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-800">{label}</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50 flex flex-col items-center justify-center">
          {isFilePDF ? (
            <>
              <div className="bg-white rounded-lg shadow-2xl overflow-auto max-h-[75vh] w-full flex justify-center">
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
              {numPages > 1 && (
                <div className="mt-3 flex items-center gap-4 bg-white rounded-full px-4 py-2 shadow-lg">
                  <button
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    disabled={pageNumber <= 1}
                    className="text-gray-600 hover:text-blue-600 disabled:opacity-30"
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
                    className="text-gray-600 hover:text-blue-600 disabled:opacity-30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <img
              src={preview}
              alt={label}
              className="max-w-full max-h-[70vh] object-contain rounded-xl"
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Document Card
// ─────────────────────────────────────────────
export const DocumentCard = ({
  apiId,
  label,
  description,
  preview,
  status,
  remark,
  fileKey,
  onReplace,
}) => {
  const [localPreview, setLocalPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replaced, setReplaced] = useState(false);
  const [imgError, setImgError] = useState(false);
  const replaceRef = useRef(null);

  // Sync localPreview whenever preview prop changes
  useEffect(() => {
    if (!preview) return;
    if (preview.startsWith("blob:")) {
      setLocalPreview(preview);
      return;
    }
    const fullUrl = preview.startsWith("http")
      ? preview
      : `${BASE_URL}/${preview.replace(/^\//, "")}`;
    setLocalPreview(fullUrl);
    setImgError(false);
  }, [preview]);

  const handleReplace = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    setLocalPreview(blobUrl);
    setReplaced(true);
    setImgError(false);
    onReplace?.({ id: apiId, file, fileKey });
  };

  const isFilePDF = isPDF(localPreview);

  // Border color logic
  const borderColor =
    status === "correct"
      ? "border-green-400"
      : status === "wrong"
      ? replaced
        ? "border-blue-400"
        : "border-red-400"
      : "border-gray-200";

  return (
    <>
      <div className={`bg-white border-2 rounded-2xl p-4 shadow-sm flex flex-col gap-3 transition-all ${borderColor}`}>

        {/* Title */}
        <div>
          <p className="text-sm font-bold text-gray-800">{label}</p>
          {description && (
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          )}
        </div>

        {/* Image / PDF Preview */}
        <div
          onClick={() => localPreview && !imgError && setShowModal(true)}
          className={`w-full h-44 rounded-xl border-2 flex items-center justify-center overflow-hidden
            ${localPreview && !imgError
              ? "border-gray-100 bg-gray-50 cursor-pointer hover:border-blue-300 transition-colors"
              : "border-dashed border-gray-200 bg-gray-50"
            }`}
        >
          {localPreview && !imgError ? (
            isFilePDF ? (
              // ✅ react-pdf — no download triggered, same as Form5View
              <Document
                file={localPreview}
                loading={
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-400">Loading PDF...</p>
                  </div>
                }
                error={
                  <div className="flex flex-col items-center gap-1 text-center px-3">
                    <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                    </svg>
                    <p className="text-xs text-gray-500">PDF — Click to view</p>
                  </div>
                }
              >
                <Page
                  pageNumber={1}
                  height={168}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            ) : (
              <img
                src={localPreview}
                alt={label}
                className="w-full h-full object-contain"
                onError={() => setImgError(true)}
              />
            )
          ) : (
            <div className="flex flex-col items-center text-center px-3">
              <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xs text-gray-400">
                {imgError ? "Failed to load document" : "No document uploaded"}
              </p>
              {imgError && localPreview && (
                <p className="text-[9px] text-red-300 mt-1 break-all px-2">{localPreview}</p>
              )}
            </div>
          )}
        </div>

        {/* CORRECT */}
        {status === "correct" && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2.5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-green-700">Approved</p>
              <p className="text-[10px] text-green-500">This document has been verified</p>
            </div>
          </div>
        )}

        {/* WRONG — not yet replaced */}
        {status === "wrong" && !replaced && (
          <div className="flex flex-col gap-2">
            <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2.5 flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-red-600">Rejected</p>
                {remark && <p className="text-[11px] text-red-500 mt-0.5">{remark}</p>}
              </div>
            </div>
            <button
              onClick={() => replaceRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border-2 border-dashed border-blue-300 text-blue-500 hover:bg-blue-50 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Replace Document
            </button>
            <input ref={replaceRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleReplace} />
          </div>
        )}

        {/* WRONG — replaced */}
        {status === "wrong" && replaced && (
          <div className="flex flex-col gap-2">
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-blue-700">Document Replaced</p>
                <p className="text-[10px] text-blue-400">Ready to submit</p>
              </div>
            </div>
            <button
              onClick={() => replaceRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition border border-gray-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Change Again
            </button>
            <input ref={replaceRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleReplace} />
          </div>
        )}

        {/* PENDING */}
        {!status && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500">Pending Review</p>
              <p className="text-[10px] text-gray-400">Under evaluation</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <DocumentModal
          preview={localPreview}
          label={label}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};