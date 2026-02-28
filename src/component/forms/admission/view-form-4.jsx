import React, { useState, useEffect } from "react";
import Button from "../../button";
import { useAdminVerifyDocument, useGetApplicantDocument } from "../../../../api/client/admin";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import BackButton from "../../back-button";
import Error from "../../error";
import ApplicantReviewHeader from "../../header/applicant-review-header";
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
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
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
    const finalReason =
      selected === "Other" && otherText.trim()
        ? otherText.trim()
        : selected;
    onConfirm(finalReason);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
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
                ${selected === reason
                  ? "border-red-400 bg-red-50 text-red-700 font-medium"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
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
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Document Card ─────────────────────────────────────────────────────────
const DocumentViewItem = ({ apiId, label, description, preview, status, reason, onCorrect, onWrong }) => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showWrongModal, setShowWrongModal] = useState(false);
  const isFilePDF = isPDF(preview);

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
          onClick={() => preview && setShowPreviewModal(true)}
          className={`w-full h-44 rounded-lg border-2 flex items-center justify-center overflow-hidden
            ${preview
              ? "border-green-200 bg-green-50 cursor-pointer hover:border-blue-400 transition-colors"
              : "border-dashed border-gray-200 bg-gray-50"
            }`}
        >
          {preview ? (
            isFilePDF ? (
              <Document
                file={preview}
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
              <img src={preview} alt={label} className="w-full h-full object-contain" />
            )
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

        {/* Action Buttons */}
        {preview && (
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => onCorrect(apiId)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border transition
                ${status === "correct"
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-green-400 text-green-600 hover:bg-green-50"
                }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Correct
            </button>
            <button
              onClick={() => setShowWrongModal(true)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold border transition
                ${status === "wrong"
                  ? "bg-red-500 border-red-500 text-white"
                  : "border-red-400 text-red-500 hover:bg-red-50"
                }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
              {status === "wrong" ? "Edit Reason" : "Wrong"}
            </button>
          </div>
        )}
      </div>

      {showPreviewModal && (
        <DocumentModal preview={preview} label={label} onClose={() => setShowPreviewModal(false)} />
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
const Form5View = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");
  const { data: documentInfo, isLoading } = useGetApplicantDocument({ userId: applicantID });

  // Map document labels to API documentName values
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

  // Build documents list from API data
  // Each document uses the `id` coming from the API response
  const documents = DOCUMENT_CONFIG.map((config) => {
    const apiDoc = documentInfo?.find((d) => d.documentName === config.documentName);
    return {
      apiId: apiDoc?.id || null,
      documentName: config.documentName,
      label: config.label,
      description: config.description,
      preview: apiDoc?.fileUrl || null,
      initialStatus: apiDoc?.status || null,
      initialReason: apiDoc?.remark || null,
    };
  });

  const getKey = (doc) => doc.apiId ?? doc.documentName;

  const [checklist, setChecklist] = useState({});

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
      [key]: {
        status: prev[key]?.status === "correct" ? null : "correct",
        reason: null,
      },
    }));
    console.log("✅ API ID:", key, "| Status: correct");
  };

  const handleWrong = (key, reason) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: { status: "wrong", reason },
    }));
  };

  const uploadedDocs = documents.filter((d) => d.preview);
  const reviewedCount = uploadedDocs.filter((d) => checklist[getKey(d)]?.status !== null && checklist[getKey(d)]?.status !== undefined).length;
  const allReviewed = uploadedDocs.length > 0 && reviewedCount === uploadedDocs.length;
  const correctCount = uploadedDocs.filter((d) => checklist[getKey(d)]?.status === "correct").length;
  const wrongCount = uploadedDocs.filter((d) => checklist[getKey(d)]?.status === "wrong").length;

  const { verfiyDocument, isSuccess, isPending, isError, error } = useAdminVerifyDocument(applicantID)

  const handleSubmit = () => {
    if (!allReviewed) return;
    const payload = uploadedDocs.map((doc) => ({
      id: doc.apiId,                          // API ID
      status: checklist[getKey(doc)]?.status,
      reason: checklist[getKey(doc)]?.reason || null,
    }));
    verfiyDocument({ verfication: payload })
    // TODO: your API call here e.g. updateDocumentReview(payload)
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-sm text-gray-400">Loading documents...</p>
      </div>
    );
  }

  if (isError) return <Error />

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 w-full">

      <BackButton
        onClick={() => navigate(`/admin/applications`)}
      />
      <ApplicantReviewHeader name="Document Review" />
      {/* Document Cards */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
              onCorrect={handleCorrect}
              onWrong={handleWrong}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
        <Button
          onClick={() => navigate(`/admin/applications/view-form-3?applicantID=${applicantID}`)}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          ← Previous Step
        </Button>

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
              ${allReviewed
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form5View;