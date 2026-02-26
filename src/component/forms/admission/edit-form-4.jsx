import React, { useState, useRef } from "react";
import { DocumentCard } from "../../cards/document-card";
import { MissingIncomeCard } from "../../cards/missing-income";

const DEMO_DOCUMENTS = [
  {
    id: 17285,
    fileUrl: "https://iccdfreelancematzsolutionsbucket.s3.eu-north-1.amazonaws.com/1771999701795-2.jpg",
    filekey: "1771999701795-2.jpg",
    documentName: "Birth Certificate",
    status: "correct",
    remark: null,
  },
  {
    id: 17286,
    fileUrl: "https://iccdfreelancematzsolutionsbucket.s3.eu-north-1.amazonaws.com/1771999701795-2.jpg",
    filekey: "1771999701795-3.jpg",
    documentName: "Guardian Doimicile",
    status: "wrong",
    remark: "Image is blurry",
  },
  {
    id: 17287,
    fileUrl: "https://iccdfreelancematzsolutionsbucket.s3.eu-north-1.amazonaws.com/1771999701795-2.jpg",
    filekey: "1771999701795-4.jpg",
    documentName: "Guardian CNIC",
    status: "wrong",
    remark: "Document is expired",
  },
  {
    id: 17289,
    fileUrl: "https://iccdfreelancematzsolutionsbucket.s3.eu-north-1.amazonaws.com/1771999701795-2.jpg",
    filekey: "1771999701795-2.jpg",
    documentName: "Guardian PRC",
    status: "correct",
    remark: null,
  },
  //  {
  //   id: 17289,
  //   fileUrl: "https://iccdfreelancematzsolutionsbucket.s3.eu-north-1.amazonaws.com/1771999701795-2.jpg",
  //   filekey: "1771999701795-2.jpg",
  //   documentName: "Parents / Guardian Income Certficaition",
  //   status: "correct",
  //   remark: null,
  // },
];

const INCOME_DOC_NAME = "Parents / Guardian Income Certficaition";





const EditDocument = () => {
  const DOCUMENT_CONFIG = [
    { documentName: "Birth Certificate",  label: "Birth Certificate (B-Form)", description: "Student's NADRA B-Form or Birth Certificate" },
    { documentName: "Guardian Doimicile", label: "Parent/Guardian Domicile",description: "Copy of parent or guardian's Domicile" },
    { documentName: "Guardian CNIC", label: "Parent/Guardian CNIC",description: "Copy of parent or guardian's CNIC" },
    { documentName: "Guardian PRC",  label: "Parent/Guardian PRC",description: "Copy of parent or guardian's PRC" },
    { documentName: INCOME_DOC_NAME,label: "Guardian Income Certificate",description: "Copy of parent or guardian's Income Certificate" },
  ];

  // Check if income doc exists in API data
  const incomeDocExists = DEMO_DOCUMENTS.some((d) => d.documentName === INCOME_DOC_NAME);

  const documents = DOCUMENT_CONFIG
    .filter((c) => c.documentName !== INCOME_DOC_NAME) // render income separately
    .map((config) => {
      const apiDoc = DEMO_DOCUMENTS.find((d) => d.documentName === config.documentName);
      return {
        apiId:    apiDoc?.id       || null,
        documentName: config.documentName,
        label:    config.label,
        description: config.description,
        preview:  apiDoc?.fileUrl  || null,
        fileKey:  apiDoc?.filekey  || null,
        status:   apiDoc?.status   || null,
        remark:   apiDoc?.remark   || null,
      };
    });

  // replacedFiles: array of { id, fileKey, file, type: "replace" | "new" }
  const [replacedFiles, setReplacedFiles] = useState([]);

  const upsert = (entry) => {
    setReplacedFiles((prev) => {
      const exists = prev.findIndex((r) => r.id === entry.id && r.type === entry.type);
      if (exists !== -1) {
        const updated = [...prev];
        updated[exists] = entry;
        return updated;
      }
      return [...prev, entry];
    });
  };

  const handleReplace = (docId, { id, file, fileKey }) => {
    upsert({ id, fileKey, file, type: "replace" });
  };

  const handleIncomeUpload = ({ file }) => {
    upsert({ id: null, fileKey: null, file, type: "new_income" });
  };

  const wrongDocs = documents.filter((d) => d.status === "wrong");
  const allWrongReplaced = wrongDocs.every((d) =>
    replacedFiles.some((r) => r.id === d.apiId && r.type === "replace")
  );
  const incomeReady = incomeDocExists || replacedFiles.some((r) => r.type === "new_income");
  const canSubmit = allWrongReplaced && incomeReady;

  const handleSubmit = () => {
    if (!canSubmit) return;

    // Build FormData
    const formData = new FormData();
    replacedFiles.forEach((entry, idx) => {
      formData.append(`files[${idx}][id]`,      entry.id      ?? "");
      formData.append(`files[${idx}][fileKey]`, entry.fileKey ?? "");
      formData.append(`files[${idx}][type]`,    entry.type);
      formData.append(`files[${idx}][file]`,    entry.file);
    });

    // Human-readable array for console
    const payload = replacedFiles.map(({ id, fileKey, type, file }) => ({
      id,
      fileKey,
      type,
      fileName: file.name,
    }));

    console.log("📤 Submit Array:", payload);
    alert("Submitted! Check console for payload array.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8">

        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow-sm mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-base font-bold text-gray-800">Your Documents</h1>
            <p className="text-xs text-gray-400 mt-0.5">View your document status and replace any rejected ones</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">
              ✓ {documents.filter((d) => d.status === "correct").length} Approved
            </span>
            <span className="text-xs bg-red-100 text-red-600 font-semibold px-2.5 py-1 rounded-full">
              ✕ {wrongDocs.length} Rejected
            </span>
            <span className="text-xs bg-gray-100 text-gray-500 font-semibold px-2.5 py-1 rounded-full">
              ⏳ {documents.filter((d) => !d.status).length} Pending
            </span>
          </div>
        </div>

        {/* Document Cards */}
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
              onReplace={(data) => handleReplace(doc.apiId, data)}
            />
          ))}

          {!incomeDocExists ? (
            <MissingIncomeCard
              label="Guardian Income Certificate"
              description="Copy of parent or guardian's Income Certificate"
              onUpload={handleIncomeUpload}
            />
          ) : (
            (() => {
              const apiDoc = DEMO_DOCUMENTS.find((d) => d.documentName === INCOME_DOC_NAME);
              return (
                <DocumentCard
                  key={INCOME_DOC_NAME}
                  apiId={apiDoc?.id || null}
                  label="Guardian Income Certificate"
                  description="Copy of parent or guardian's Income Certificate"
                  preview={apiDoc?.fileUrl || null}
                  status={apiDoc?.status || null}
                  remark={apiDoc?.remark || null}
                  fileKey={apiDoc?.filekey || null}
                  onReplace={(data) => handleReplace(apiDoc?.id, data)}
                />
              );
            })()
          )}
        </div>

        {/* Submit */}
        <div className="mt-6 flex items-center justify-end gap-3 flex-wrap">
          {wrongDocs.length > 0 && !allWrongReplaced && (
            <p className="text-xs text-red-400 font-medium">Replace all rejected documents to continue</p>
          )}
          {!incomeDocExists && !replacedFiles.some((r) => r.type === "new_income") && (
            <p className="text-xs text-orange-400 font-medium">Upload the missing income document to continue</p>
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
                : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDocument;