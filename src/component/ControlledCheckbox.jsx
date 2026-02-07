import {  Controller } from 'react-hook-form';

export const ControlledCheckbox = ({ 
  name, 
  control, 
  label, 
  errors 
}) => (
  <div className="mb-8">
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label className="flex items-start cursor-pointer bg-gray-50 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
          <input
            type="checkbox"
            {...field}
            checked={field.value}
            className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 mt-0.5 flex-shrink-0"
          />
          <span className="ml-3 text-sm text-gray-700">
            {label}
          </span>
        </label>
      )}
    />
    {errors[name] && (
      <span className="text-red-500 text-xs mt-1 block">
        {errors[name].message}
      </span>
    )}
  </div>
);