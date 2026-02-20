import { X } from "lucide-react";



export default function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 text-xs font-medium px-2.5 py-1 rounded-full ring-1 ring-teal-200">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-teal-900 transition-colors ml-0.5"
        aria-label={`Remove ${label} filter`}
      >
        <X size={11} />
      </button>
    </span>
  );
}
