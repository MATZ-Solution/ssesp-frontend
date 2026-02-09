import {  Controller } from 'react-hook-form';

export const ControlledCheckbox = ({ name, control, label, errors }) => (
  <div className="mb-6">
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 mt-0.5"
          />
          <span className="text-sm text-gray-700">{label}</span>
        </label>
      )}
    />
    {errors[name] && (
      <span className="text-red-500 text-xs mt-1 block ml-8">{errors[name].message}</span>
    )}
  </div>
);