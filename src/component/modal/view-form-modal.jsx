import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { memo } from "react";
import { Form1View } from "../forms/admission/view-form-1";
import { Form2View } from "../forms/admission/view-form-2";
import { Form3View } from "../forms/admission/view-form-3";
import { Form4View } from "../forms/admission/view-form-4";
import Form5View from "../forms/admission/view-form-5";
import Form6View from "../forms/admission/view-form-6";

const ViewFormModal = ({ isOpen, onClose, applicantID }) => {

  const [title, setTitle] = useState('Student Information')
  const handleTitle = (title) => setTitle(title)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="h-[100vh] fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="
          relative z-50
          w-full
          max-w-3xl
          bg-white
          rounded-2xl
          shadow-2xl
          flex
          flex-col
          max-h-[90vh]
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 ">
          {title && (
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {title}
            </h2>
          )}

          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto ">
          {title === "Student Information" && <Form1View applicantID={applicantID} handleTitle={handleTitle} />}
          {title === "Guardian Information" && <Form2View applicantID={applicantID} handleTitle={handleTitle} />}
          {title === "Address Information" && <Form3View applicantID={applicantID} handleTitle={handleTitle} />}
          {title === "School Information" && <Form4View applicantID={applicantID} handleTitle={handleTitle} />}
          {title === "Document Information" && <Form5View applicantID={applicantID} handleTitle={handleTitle} />}
          {title === "School Preference Information" && <Form6View applicantID={applicantID} handleTitle={handleTitle} />}

        </div>
      </div>
    </div>
  );
};

export default memo(ViewFormModal);
