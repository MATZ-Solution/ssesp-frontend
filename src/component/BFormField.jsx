import { ControlledInputField } from "./input-field";
import { Controller } from "react-hook-form";

export const BFormField = ({ control, errors, watchNoBForm, setValue }) => {
  return (
    <div>
      {!watchNoBForm ? (
        <ControlledInputField
          name="studentBForm"
          control={control}
          label="Student B-Form"
          placeholder="12345-1234567-1"
          maxLength={15}
          required={!watchNoBForm}
          errors={errors}
          helpText="Format: 12345-1234567-1"
        />
      ) : (
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
            Student B-Form{" "}
            <span className="text-red-500" aria-label="required">*</span>
          </label>
          <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50">
            <span className="text-gray-600 font-medium">
              Applied For
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            B-Form will be submitted later
          </p>
        </div>
      )}

      <Controller
        name="noBForm"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <label className="flex items-center space-x-2 mt-3 cursor-pointer">
            <input
              type="checkbox"
              {...field}
              checked={field.value}
              onChange={(e) => {
                const checked = e.target.checked;
                field.onChange(checked);

                if (checked) {
                  setValue("studentBForm", "Applied For");
                } else {
                  setValue("studentBForm", "");
                }
              }}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
            />
            <span className="text-sm text-gray-700">
              Applied For a Student B-Form
            </span>
          </label>
        )}
      />
    </div>
  );
};
