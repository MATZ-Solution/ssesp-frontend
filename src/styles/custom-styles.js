export const customSelectStyles = (errors = {}) => ({
  control: (base, state) => ({
    ...base,
    padding: '0.375rem 0.5rem',
    borderRadius: '0.5rem',
    borderColor: state.isFocused
      ? '#3B82F6'
      : errors?.[state.selectProps.name]
      ? '#EF4444'
      : '#D1D5DB',
    backgroundColor: errors?.[state.selectProps.name]
      ? '#FEF2F2'
      : 'white',
    boxShadow: state.isFocused
      ? '0 0 0 2px rgba(59, 130, 246, 0.5)'
      : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#3B82F6' : '#9CA3AF',
    },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#3B82F6'
      : state.isFocused
      ? '#DBEAFE'
      : 'white',
    color: state.isSelected ? 'white' : '#1F2937',
    '&:active': {
      backgroundColor: '#3B82F6',
    },
  }),
});
