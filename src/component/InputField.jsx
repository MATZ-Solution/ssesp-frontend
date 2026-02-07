import {  Controller } from 'react-hook-form';

export const ControlledInputField = ({ 
  name, 
  control, 
  label, 
  placeholder, 
  required, 
  errors,
  type = 'text',
  maxLength,
  helpText
}) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-gray-700 mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
            errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
        />
      )}
    />
    {errors[name] && (
      <span className="text-red-500 text-xs mt-1">{errors[name].message}</span>
    )}
    {helpText && (
      <span className="text-xs text-gray-500 mt-1">{helpText}</span>
    )}
  </div>
);