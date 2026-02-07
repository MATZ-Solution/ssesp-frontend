import {  Controller } from 'react-hook-form';

export const ControlledRadioGroup = ({ name, control, label, options, required, errors }) => (
  <div className="flex flex-col">
    <label className="text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex gap-4">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={option.value}
                checked={field.value === option.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    />
    {errors[name] && (
      <span className="text-red-500 text-xs mt-1">{errors[name].message}</span>
    )}
  </div>
);