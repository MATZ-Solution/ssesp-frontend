import { useRef, useState } from "react";

export const MissingIncomeCard = ({ label, description, onUpload }) => {
  const inputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setUploadedFile({ file, preview });
    onUpload({ file });
  };

  return (
    <div className="bg-white border-2 border-dashed border-orange-300 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
      {/* Title */}
      <div>
        <p className="text-sm font-bold text-gray-800">{label}</p>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>

      {/* Preview or empty state */}
      {uploadedFile ? (
        <div
          className="w-full h-44 rounded-xl border-2 border-gray-100 bg-gray-50 overflow-hidden cursor-pointer"
          onClick={() => {}}
        >
          <img src={uploadedFile.preview} alt={label} className="w-full h-full object-contain" />
        </div>
      ) : (
        <div className="w-full h-44 rounded-xl border-2 border-dashed border-orange-200 bg-orange-50 flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-xs text-orange-400 font-medium">Document not uploaded yet</p>
        </div>
      )}

      {/* Missing notice */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5 flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-full bg-orange-400 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-orange-600">Document Missing</p>
          <p className="text-[11px] text-orange-500 mt-0.5">
            Guardian Income Statement was not uploaded. Please upload it now.
          </p>
        </div>
      </div>

      {/* Upload / Change button */}
      {uploadedFile ? (
        <div className="flex flex-col gap-2">
          <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2.5 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-green-700">Uploaded</p>
              <p className="text-[10px] text-green-400 truncate">{uploadedFile.file.name}</p>
            </div>
            <button onClick={() => inputRef.current?.click()} className="text-[10px] text-green-600 hover:underline shrink-0">
              Change
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border-2 border-dashed border-orange-300 text-orange-500 hover:bg-orange-50 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Upload Guardian Income Statement
        </button>
      )}

      <input ref={inputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handleChange} />
    </div>
  );
};