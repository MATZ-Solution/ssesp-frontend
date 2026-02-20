import Select from "react-select";
const customStyles = {
  control: (base, state) => ({
    ...base,
    minWidth: "160px",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#14b8a6" : "#e2e8f0",
    boxShadow: state.isFocused ? "0 0 0 2px #99f6e4" : "none",
    "&:hover": { borderColor: "#cbd5e1" },
    fontSize: "0.875rem",
    color: "#374151",
    cursor: "pointer",
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "0.875rem",
    backgroundColor: state.isSelected
      ? "#0d9488"
      : state.isFocused
      ? "#f0fdfa"
      : "white",
    color: state.isSelected ? "white" : "#374151",
    cursor: "pointer",
  }),
  placeholder: (base) => ({ ...base, color: "#94a3b8" }),
  singleValue: (base) => ({ ...base, color: "#374151" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({ ...base, color: "#94a3b8", padding: "0 8px" }),
  menu: (base) => ({ ...base, borderRadius: "0.5rem", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 50 }),
  menuList: (base) => ({ ...base, borderRadius: "0.5rem", padding: "4px" }),
};

export default function FilterSelect({ label, value, options, onChange }) {
  const selectOptions = options.map((opt) => ({ value: opt, label: opt }));
  const selectedOption = selectOptions.find((o) => o.value === value) || null;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <Select
        options={selectOptions}
        value={selectedOption}
        onChange={(opt) => onChange(opt ? opt.value : "")}
        placeholder={`All ${label}s`}
        isClearable
        styles={customStyles}
      />
    </div>
  );
}