import React, { useState } from "react";
import { DocumentCard } from "../../cards/document-card";
import { MissingIncomeCard } from "../../cards/missing-income";
import { useGetApplicantDocument } from "../../../../api/client/applicant";
import { useSearchParams } from "react-router-dom";

const INCOME_DOC_NAME = "Parents / Guardian Income Certficaition";

const DOCUMENT_CONFIG = [
  { documentName: "Birth Certificate",  label: "Birth Certificate (B-Form)",  description: "Student's NADRA B-Form or Birth Certificate" },
  { documentName: "Guardian Doimicile", label: "Parent/Guardian Domicile",     description: "Copy of parent or guardian's Domicile" },
  { documentName: "Guardian CNIC",      label: "Parent/Guardian CNIC",         description: "Copy of parent or guardian's CNIC" },
  { documentName: "Guardian PRC",       label: "Parent/Guardian PRC",          description: "Copy of parent or guardian's PRC" },
  { documentName: INCOME_DOC_NAME,      label: "Guardian Income Certificate",  description: "Copy of parent or guardian's Income Certificate" },
];

const EditDocument = () => {
  const [searchParams] = useSearchParams();
  const applicantID = searchParams.get("applicantID");

  const { data, isLoading, isError } = useGetApplicantDocument({ userId: applicantID });

  // ── State 1: New files to upload ──────────────────────────────────────────
  // Each entry: { type: "replace" | "new_income", documentName, file: File }
  const [replacedFiles, setReplacedFiles] = useState([]);

  // ── State 2: Old S3 file keys to delete from server ───────────────────────
  // Each entry: { id, documentName, fileKey }
  // Recorded ONCE per document on first replace — preserves the original S3 key
  // even if user hits "Change Again" multiple times
  const [previousFileKeys, setPreviousFileKeys] = useState([]);

  // ── Helpers ───────────────────────────────────────────────────────────────

  // Upsert replacedFiles by documentName (overwrite if user changes again)
  const upsertReplaced = (entry) => {
    setReplacedFiles((prev) => {
      const idx = prev.findIndex((r) => r.documentName === entry.documentName);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx] = entry;
        return updated;
      }
      return [...prev, entry];
    });
  };

  // Record the OLD fileKey + id only on the FIRST replace of each document
  // so "Change Again" doesn't overwrite the original server key
  const recordPreviousKey = (documentName, fileKey, id) => {
    if (!fileKey) return; // nothing to record if no key exists
    setPreviousFileKeys((prev) => {
      const alreadyRecorded = prev.some((p) => p.documentName === documentName);
      if (alreadyRecorded) return prev; // ✅ keep original — don't overwrite
      return [...prev, { id, documentName, fileKey }];
    });
  };

  // ── Handlers ──────────────────────────────────────────────────────────────

  // Called from DocumentCard when user picks a replacement file
  // `fileKey` here is the OLD key currently stored on the server
  const handleReplace = (documentName, apiId, { file, fileKey }) => {
    recordPreviousKey(documentName, fileKey, apiId); // 1️⃣ save old id + key first
    upsertReplaced({ type: "replace", documentName, file }); // 2️⃣ store new file
  };

  const handleIncomeUpload = ({ file }) => {
    upsertReplaced({ type: "new_income", documentName: INCOME_DOC_NAME, file });
  };

  // ── Derived data ──────────────────────────────────────────────────────────
  const incomeDocExists = data?.some((d) => d.documentName === INCOME_DOC_NAME);

  const documents = DOCUMENT_CONFIG
    .filter((c) => c.documentName !== INCOME_DOC_NAME)
    .map((config) => {
      const apiDoc = data?.find((d) => d.documentName === config.documentName);
      return {
        apiId:        apiDoc?.id       || null,
        documentName: config.documentName,
        label:        config.label,
        description:  config.description,
        preview:      apiDoc?.fileUrl  || null,
        fileKey:      apiDoc?.filekey  || null,
        status:       apiDoc?.status   || null,
        remark:       apiDoc?.remark   || null,
      };
    });

  const wrongDocs        = documents.filter((d) => d.status === "wrong");
  const allWrongReplaced = wrongDocs.every((d) =>
    replacedFiles.some((r) => r.documentName === d.documentName && r.type === "replace")
  );
  const incomeReady = incomeDocExists || replacedFiles.some((r) => r.type === "new_income");
  const canSubmit   = allWrongReplaced && incomeReady;

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!canSubmit) return;

    const formData = new FormData();

    // New files — type + file only
    replacedFiles.forEach((entry, idx) => {
      formData.append(`files[${idx}][type]`, entry.type);
      formData.append(`files[${idx}][file]`, entry.file);
    });

    // Old S3 keys to delete — send as a separate array
    previousFileKeys.forEach((entry, idx) => {
      formData.append(`deleteKeys[${idx}]`, entry.fileKey);
    });

    // ── Console logs ──
    console.log(
      "📤 New files to upload:",
      replacedFiles.map(({ type, documentName, file }) => ({
        type,
        documentName,
        fileName: file.name,
      }))
    );

    console.log(
      "🗑️ Old S3 keys to delete from server:",
      previousFileKeys
    );

    // TODO: pass formData to your API mutation
    // e.g. await submitDocuments(formData);

    alert("Submitted! Check console.");
  };

  // ── Loading / Error ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400 animate-pulse">Loading documents…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-red-400">Failed to load documents. Please try again.</p>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8">

        {/* ── Header ── */}
        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-base font-bold text-gray-800">Your Documents</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              View your document status and replace any rejected ones
            </p>
          </div>
        </div>

        {/* ── Document Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.documentName}
              apiId={doc.apiId}
              label={doc.label}
              description={doc.description}
              preview={doc.preview}
              status={doc.status}
              remark={doc.remark}
              fileKey={doc.fileKey}
              onReplace={(data) => handleReplace(doc.documentName, doc.apiId, data)}
            />
          ))}

          {/* Income document */}
          {!incomeDocExists ? (
            <MissingIncomeCard
              label="Guardian Income Certificate"
              description="Copy of parent or guardian's Income Certificate"
              onUpload={handleIncomeUpload}
            />
          ) : (() => {
            const apiDoc = data?.find((d) => d.documentName === INCOME_DOC_NAME);
            return (
              <DocumentCard
                key={INCOME_DOC_NAME}
                apiId={apiDoc?.id || null}
                label="Guardian Income Certificate"
                description="Copy of parent or guardian's Income Certificate"
                preview={apiDoc?.fileUrl  || null}
                status={apiDoc?.status    || null}
                remark={apiDoc?.remark    || null}
                fileKey={apiDoc?.filekey  || null}
                onReplace={(data) => handleReplace(INCOME_DOC_NAME, apiDoc?.id, data)}
              />
            );
          })()}
        </div>

        {/* ── Footer / Submit ── */}
        <div className="mt-6 flex items-center justify-end gap-3 flex-wrap">
          {wrongDocs.length > 0 && !allWrongReplaced && (
            <p className="text-xs text-red-400 font-medium">
              Replace all rejected documents to continue
            </p>
          )}
          {!incomeDocExists && !replacedFiles.some((r) => r.type === "new_income") && (
            <p className="text-xs text-orange-400 font-medium">
              Upload the missing income document to continue
            </p>
          )}
          {canSubmit && (
            <p className="text-xs text-green-600 font-medium">All done ✓</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all
              ${canSubmit
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditDocument;