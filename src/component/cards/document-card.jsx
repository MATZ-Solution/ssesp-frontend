import { useState, useRef, useEffect } from "react";

// ✅ Amazon CDN URL — set VITE_CDN_URL in your .env file
// e.g. VITE_CDN_URL=https://your-cdn.cloudfront.net
// or   VITE_CDN_URL=https://your-bucket.s3.amazonaws.com
const BASE_URL = import.meta.env.VITE_CDN_URL || "";

// ─────────────────────────────────────────────
// Document Modal
// ─────────────────────────────────────────────
const DocumentModal = ({ preview, label, onClose }) => {
  const isPdf =
    typeof preview === "string" &&
    (preview.endsWith(".pdf") || preview.includes("application/pdf"));

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
        <div className="flex-1 overflow-auto p-4 bg-gray-50 flex items-center justify-center">
          {isPdf ? (
            <iframe
              src={preview}
              title={label}
              className="w-full h-[70vh] rounded-xl border border-gray-200"
            />
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
  preview,       // raw value from API (relative path or full URL)
  status,        // "correct" | "wrong" | null/undefined
  remark,
  fileKey,
  onReplace,
}) => {
  const [localPreview, setLocalPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [replaced, setReplaced] = useState(false);
  const [imgError, setImgError] = useState(false);
  const replaceRef = useRef(null);

  // ✅ Fix 1: Sync localPreview whenever `preview` prop changes (handles async API data)
  useEffect(() => {
    if (!preview) return;

    // ✅ Fix 2: If it's already a blob URL (after replace), keep as-is
    if (preview.startsWith("blob:")) {
      setLocalPreview(preview);
      return;
    }

    // ✅ Fix 3: If it's already a full URL, use directly; else prepend BASE_URL
    const fullUrl = preview.startsWith("http")
      ? preview
      : `${BASE_URL}/${preview.replace(/^\//, "")}`;

    setLocalPreview(fullUrl);
    setImgError(false); // reset error when new preview arrives
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

  const isPdf =
    typeof localPreview === "string" &&
    (localPreview.endsWith(".pdf") || localPreview.includes("application/pdf"));

  // ── Border color logic ──
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
      <div
        className={`bg-white border-2 rounded-2xl p-4 shadow-sm flex flex-col gap-3 transition-all ${borderColor}`}
      >
        {/* ── Title ── */}
        <div>
          <p className="text-sm font-bold text-gray-800">{label}</p>
          {description && (
            <p className="text-xs text-gray-400 mt-0.5">{description}</p>
          )}
        </div>

        {/* ── Image / PDF Preview ── */}
        <div
          onClick={() => localPreview && !imgError && setShowModal(true)}
          className={`w-full h-44 rounded-xl border-2 flex items-center justify-center overflow-hidden
            ${localPreview && !imgError
              ? "border-gray-100 bg-gray-50 cursor-pointer hover:border-blue-300 transition-colors"
              : "border-dashed border-gray-200 bg-gray-50"
            }`}
        >
          {localPreview && !imgError ? (
            isPdf ? (
              // ✅ Fix 4: PDFs render in iframe, not img tag
              <iframe
                src={localPreview}
                title={label}
                className="w-full h-full pointer-events-none"
              />
            ) : (
              <img
                src={localPreview}
                alt={label}
                className="w-full h-full object-contain"
                // ✅ Fix 5: Handle broken image URLs gracefully
                onError={() => setImgError(true)}
              />
            )
          ) : (
            <div className="flex flex-col items-center text-center px-3">
              <svg
                className="w-10 h-10 text-gray-300 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-xs text-gray-400">
                {imgError ? "Failed to load document" : "No document uploaded"}
              </p>
              {/* ✅ Show broken URL in dev mode to help debug */}
              {imgError && localPreview && (
                <p className="text-[9px] text-red-300 mt-1 break-all px-2">
                  {localPreview}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ── CORRECT ── */}
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

        {/* ── WRONG — not yet replaced ── */}
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
                {remark && (
                  <p className="text-[11px] text-red-500 mt-0.5">{remark}</p>
                )}
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
            <input
              ref={replaceRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleReplace}
            />
          </div>
        )}

        {/* ── WRONG — replaced ── */}
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
            <input
              ref={replaceRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={handleReplace}
            />
          </div>
        )}

        {/* ── PENDING (no status) ── */}
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

      {/* ── Modal ── */}
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