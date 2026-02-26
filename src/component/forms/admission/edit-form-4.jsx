import React, { useState, useEffect, useRef } from "react";
import Button from "../../button";
import { useGetApplicantDocument } from "../../../../api/client/applicant";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const isPDF = (url) => {
  if (!url) return false;
  return (
    url.toLowerCase().includes(".pdf") ||
    url.toLowerCase().includes("application/pdf")
  );
};

// ─── Document Preview Modal ────────────────────────────────────────────────
const DocumentModal = ({ preview, label, onClose }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const isFilePDF = isPDF(preview);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 shadow-lg z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {isFilePDF ? (
          <>
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
                <span className="text-sm font-medium text-gray-700">Page {pageNumber} of {numPages}</span>
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
            className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        )}
      </div>
    </div>
  );
};

// ─── Wrong Reason Modal ────────────────────────────────────────────────────
const WRONG_REASONS = [
  "Image is blurry",
  "Image is invalid",
  "Document is expired",
  "Document is incomplete",
  "Wrong document uploaded",
  "Other",
];

const WrongReasonModal = ({ label, currentReason, onConfirm, onCancel }) => {
  const [selected, setSelected] = useState(
    WRONG_REASONS.includes(currentReason) ? currentReason : currentReason ? "Other" : null
  );
  const [otherText, setOtherText] = useState(
    currentReason && !WRONG_REASONS.includes(currentReason) ? currentReason : ""
  );

  const handleConfirm = () => {
    if (!selected) return;
    const finalReason = selected === "Other" && otherText.trim() ? otherText.trim() : selected;
    onConfirm(finalReason);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-sm font-bold text-gray-800">Why is this document wrong?</p>
          <p className="text-xs text-gray-400 mt-0.5">{label}</p>
        </div>
        <div className="flex flex-col gap-2">
          {WRONG_REASONS.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelected(reason)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm text-left transition-colors
                ${selected === reason ? "border-red-400 bg-red-50 text-red-700 font-medium" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0
                ${selected === reason ? "border-red-500" : "border-gray-300"}`}>
                {selected === reason && <span className="w-2 h-2 rounded-full bg-red-500" />}
              </span>
              {reason}
            </button>
          ))}
          {selected === "Other" && (
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Describe the issue..."
              rows={2}
              className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-red-400 resize-none"
            />
          )}
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selected || (selected === "Other" && !otherText.trim())}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition
              ${selected && (selected !== "Other" || otherText.trim())
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Update Document Modal ─────────────────────────────────────────────────
const UpdateDocumentModal = ({ label, fileKey, onConfirm, onCancel }) => {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleConfirm = () => {
    if (!selectedFile) return;
    onConfirm({ file: selectedFile, fileKey });
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-5 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <p className="text-sm font-bold text-gray-800">Replace Document</p>
          <p className="text-xs text-gray-400 mt-0.5">{label}</p>
        </div>

        {/* Drop Zone */}
        <div
          onClick={() => inputRef.current?.click()}
          className={`w-full h-36 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors
            ${selectedFile ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50"}`}
        >
          {preview ? (
            <img src={preview} alt="preview" className="h-full w-full object-contain rounded-lg p-1" />
          ) : selectedFile ? (
            <div className="flex flex-col items-center gap-1 text-center px-3">
              <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
              </svg>
              <p className="text-xs text-blue-600 font-medium">{selectedFile.name}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1 text-center px-3">
              <svg className="w-8 h-8 text-gray-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-xs text-gray-500 font-medium">Click to upload new document</p>
              <p className="text-[10px] text-gray-400">PNG, JPG, PDF supported</p>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* File Key Info */}
        {fileKey && (
          <div className="bg-gray-50 rounded-lg px-3 py-2 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <p className="text-[10px] text-gray-400 font-mono truncate">Replacing: {fileKey}</p>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedFile}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition
              ${selectedFile ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
          >
            Upload & Replace
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Document Card ─────────────────────────────────────────────────────────
const DocumentViewItem = ({ apiId, label, description, preview, status, reason, fileKey, onCorrect, onWrong, onUpdate }) => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [localPreview, setLocalPreview] = useState(preview); // ← local preview state
  const inputRef = useRef(null);
  const isFilePDF = isPDF(localPreview);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);                  // ← replace preview in card instantly
    onUpdate(apiId, { file, fileKey });
  };

  return (
    <>
      <div className={`bg-white border rounded-lg p-4 shadow-sm flex flex-col gap-3 transition-colors
        ${status === "correct" ? "border-green-400" : status === "wrong" ? "border-red-400" : "border-gray-200"}`}
      >
        {/* Title */}
        <div>
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
        </div>

        {/* Preview Box */}
        <div
          onClick={() => localPreview && setShowPreviewModal(true)}
          className={`w-full h-44 rounded-lg border-2 flex items-center justify-center overflow-hidden relative
            ${localPreview
              ? "border-green-200 bg-green-50 cursor-pointer hover:border-blue-400 transition-colors"
              : "border-dashed border-gray-200 bg-gray-50"}`}
        >
          {localPreview ? (
            <>
              {isFilePDF ? (
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
                  <Page pageNumber={1} height={168} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>
              ) : (
                <img src={localPreview} alt={label} className="w-full h-full object-contain" />
              )}

              {/* Replace overlay — shown only when status is wrong */}
              {status === "wrong" && (
                <div
                  onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                  className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1.5 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-lg"
                >
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <p className="text-white text-xs font-semibold">Click to replace</p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center text-center px-3">
              <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xs text-gray-400">No document uploaded</p>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Status Badge */}
        {status === "correct" && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd" />
            </svg>
            <p className="text-xs text-green-700 font-medium">Document verified as correct</p>
          </div>
        )}

        {status === "wrong" && reason && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd" />
            </svg>
            <p className="text-xs text-red-600 font-medium">{reason}</p>
          </div>
        )}

        {/* Replace hint — shown when status is wrong */}
        {status === "wrong" && (
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border border-dashed border-blue-300 text-blue-500 hover:bg-blue-50 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Replace Document
          </button>
        )}
      </div>

      {showPreviewModal && (
        <DocumentModal preview={localPreview} label={label} onClose={() => setShowPreviewModal(false)} />
      )}
      {showWrongModal && (
        <WrongReasonModal
          label={label}
          currentReason={reason}
          onConfirm={(r) => { onWrong(apiId, r); setShowWrongModal(false); }}
          onCancel={() => setShowWrongModal(false)}
        />
      )}
    </>
  );
};

// ─── Main Form5View ────────────────────────────────────────────────────────
const EditDocument = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");
  const { data: documentInfo, isLoading } = useGetApplicantDocument({ userId: applicantID });

  const DOCUMENT_CONFIG = [
    {
      documentName: "Birth Certificate",
      label: "Birth Certificate (B-Form)",
      description: "Student's NADRA B-Form or Birth Certificate",
    },
    {
      documentName: "Guardian Doimicile",
      label: "Parent/Guardian Domicile",
      description: "Copy of parent or guardian's Domicile",
    },
    {
      documentName: "Guardian CNIC",
      label: "Parent/Guardian CNIC",
      description: "Copy of parent or guardian's CNIC",
    },
    {
      documentName: "Guardian PRC",
      label: "Parent/Guardian PRC",
      description: "Copy of parent or guardian's PRC",
    },
    {
      documentName: "Parents / Guardian Income Certficaition",
      label: "Guardian Income Certificate",
      description: "Copy of parent or guardian's Income Certificate",
    },
  ];

  const documents = DOCUMENT_CONFIG.map((config) => {
    const apiDoc = documentInfo?.find((d) => d.documentName === config.documentName);
    return {
      apiId: apiDoc?.id || null,
      documentName: config.documentName,
      label: config.label,
      description: config.description,
      preview: apiDoc?.fileUrl || null,
      fileKey: apiDoc?.fileKey || null,       // ← fileKey from API
      initialStatus: apiDoc?.status || null,
      initialReason: apiDoc?.remark || null,
    };
  });

  const getKey = (doc) => doc.apiId ?? doc.documentName;

  const [checklist, setChecklist] = useState({});
  const [replacedFiles, setReplacedFiles] = useState({}); // ← stores replaced file + fileKey per doc

  useEffect(() => {
    if (!documentInfo) return;
    const initial = {};
    documents.forEach((doc) => {
      initial[getKey(doc)] = {
        status: doc.initialStatus,
        reason: doc.initialReason,
      };
    });
    setChecklist(initial);
  }, [documentInfo]);

  const handleCorrect = (key) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: { status: prev[key]?.status === "correct" ? null : "correct", reason: null },
    }));
  };

  const handleWrong = (key, reason) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: { status: "wrong", reason },
    }));
  };

  // Stores the replaced file and its fileKey
  const handleUpdate = (key, { file, fileKey }) => {
    setReplacedFiles((prev) => ({
      ...prev,
      [key]: { file, fileKey },
    }));
    console.log("📎 Replaced file for key:", key, "| fileKey:", fileKey, "| file:", file.name);
  };

  const uploadedDocs = documents.filter((d) => d.preview);
  const reviewedCount = uploadedDocs.filter((d) => checklist[getKey(d)]?.status !== null && checklist[getKey(d)]?.status !== undefined).length;
  const allReviewed = uploadedDocs.length > 0 && reviewedCount === uploadedDocs.length;
  const correctCount = uploadedDocs.filter((d) => checklist[getKey(d)]?.status === "correct").length;
  const wrongCount = uploadedDocs.filter((d) => checklist[getKey(d)]?.status === "wrong").length;


  const handleSubmit = () => {
    if (!allReviewed) return;

    const payload = uploadedDocs.map((doc) => ({
      id: doc.apiId,
      status: checklist[getKey(doc)]?.status,
      reason: checklist[getKey(doc)]?.reason || null,
    }));

    // Build FormData to send files + payload together
    const formData = new FormData();
    formData.append("verfication", JSON.stringify(payload));

    // Attach each replaced file with its fileKey
    Object.entries(replacedFiles).forEach(([key, { file, fileKey }]) => {
      formData.append(`file_${key}`, file);
      formData.append(`fileKey_${key}`, fileKey);
    });

    console.log("📤 Submit Payload:", payload);
    console.log("📎 Replaced Files:", replacedFiles);

  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-sm text-gray-400">Loading documents...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 w-full">

      {/* Header */}
      <div className="bg-blue-50 border-l-4 border-blue-500 px-4 py-3 rounded-r-lg mb-6 flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-blue-800 font-medium">Document Review</p>
      </div>

      {/* Document Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => {
          const key = getKey(doc);
          return (
            <DocumentViewItem
              key={doc.documentName}
              apiId={key}
              label={doc.label}
              description={doc.description}
              preview={doc.preview}
              status={checklist[key]?.status || null}
              reason={checklist[key]?.reason || null}
              fileKey={doc.fileKey}
              onCorrect={handleCorrect}
              onWrong={handleWrong}
              onUpdate={handleUpdate}
            />
          );
        })}
      </div>

      {/* Replaced Files Summary */}
      {Object.keys(replacedFiles).length > 0 && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex flex-col gap-1">
          <p className="text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">Queued Replacements</p>
          {Object.entries(replacedFiles).map(([key, { file, fileKey }]) => (
            <div key={key} className="flex items-center gap-2 text-xs text-blue-600">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-mono truncate">{fileKey}</span>
              <span className="text-blue-400">→</span>
              <span className="truncate">{file.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {!allReviewed && uploadedDocs.length > 0 && (
            <p className="text-xs text-gray-400">
              Review all documents ({reviewedCount}/{uploadedDocs.length})
            </p>
          )}
          <Button
            onClick={handleSubmit}
            disabled={!allReviewed}
            className={`px-4 py-2 font-semibold rounded-lg transition
              ${allReviewed ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditDocument;