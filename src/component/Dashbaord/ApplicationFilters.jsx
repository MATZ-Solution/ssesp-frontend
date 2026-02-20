import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { districts } from "../../../data/new-district";
import FilterSelect from "../FilterSelect";
import FilterChip from "../FilterChip";

const GRADE_OPTIONS = ["Grade 7", "Grade 8"];
const SCHOOL_TYPE_OPTIONS = ["Sindh Government School", "SEF School"];
const GENDER_OPTIONS = ["Male", "Female", "Other"];




export function ApplicationFilters({ filters, onChange }) {
  const [open, setOpen] = useState(false);

  const activeCount = Object.values(filters).filter(Boolean).length;

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const clearAll = () => {
    onChange({ grade: "", schoolType: "", gender: "", district: "" });
  };

  const activeFilters = Object.entries(filters).filter(([, v]) => v);

  return (
    <div className="space-y-3">
      {/* Toggle button */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setOpen((o) => !o)}
          className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl border transition-all ${
            open || activeCount > 0
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-teal-600 shadow-sm"
              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeCount > 0 && (
            <span className="bg-white text-teal-700 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {/* Active filter chips */}
        {activeFilters.map(([key, value]) => (
          <FilterChip
            key={key}
            label={value}
            onRemove={() => handleChange(key, "")}
          />
        ))}

        {activeCount > 1 && (
          <button
            onClick={clearAll}
            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter panel */}
      {open && (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-4 flex flex-wrap gap-5 items-end">
          <FilterSelect
            label="Grade"
            value={filters.grade}
            options={GRADE_OPTIONS}
            onChange={(v) => handleChange("grade", v)}
          />
          <FilterSelect
            label="School Type"
            value={filters.schoolType}
            options={SCHOOL_TYPE_OPTIONS}
            onChange={(v) => handleChange("schoolType", v)}
          />
          <FilterSelect
            label="Gender"
            value={filters.gender}
            options={GENDER_OPTIONS}
            onChange={(v) => handleChange("gender", v)}
          />
          <FilterSelect
            label="District"
            value={filters.district}
            options={districts}
            onChange={(v) => handleChange("district", v)}
          />

          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors mb-0.5"
            >
              Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ApplicationFilters;