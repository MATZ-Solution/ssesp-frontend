import { CheckCircle, X } from "lucide-react";

export const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-lg w-full border border-white/20 shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="text-white">
          {/* Title */}
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#4BA54F] to-emerald-400">
            {content.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 mb-6">
            {content.description}
          </p>

          {/* Key Features */}
          {content.features?.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-4">
                Key Features:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      size={20}
                      className="text-[#4BA54F] flex-shrink-0 mt-0.5"
                    />
                    <span className="text-gray-300 text-sm">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Button */}
          <button
            onClick={onClose}
            className="mt-8 w-full bg-gradient-to-r from-[#4BA54F] to-emerald-500 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};
