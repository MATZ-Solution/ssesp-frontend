import { CheckCircle } from "lucide-react";

export const SuccessModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-fadeIn">
        
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>

        <h2 className="mt-4 text-center text-2xl font-semibold text-gray-800">
          Application Submitted Successfully
        </h2>

        <p className="mt-3 text-center text-gray-600 leading-relaxed">
          Your Application Form for students of{" "}
          <span className="font-medium">Government and SEF Schools</span> has
          been successfully received.
          <br /><br />
          We will get back to you if you are shortlisted.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="rounded-xl px-6 py-3 text-white font-medium
            bg-gradient-to-r from-green-800 to-green-600
            hover:opacity-90 transition-all duration-300 shadow-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
