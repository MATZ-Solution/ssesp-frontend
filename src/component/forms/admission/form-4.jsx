import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ControlledInputField } from "../../input-field";
import { customSelectStyles } from "../../../styles/custom-styles";
import Select from 'react-select';
import { classOptions, schoolCategoryOptions } from "../../../../data/form-data";
import { ControlledRadioGroup } from '../../radio-button';
import { step4Schema } from "../../schema/admission-form-schema";



export const Form4 = ({ onNext, onPrevious, initialData, currentStep, totalSteps }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step4Schema),
    defaultValues: {
      schoolName: initialData?.schoolName || "",
      schoolCategory: initialData?.schoolCategory || "",
      schoolSemisCode: initialData?.schoolSemisCode || "",
      studyingInClass: initialData?.studyingInClass || null,
      enrollmentYear: initialData?.enrollmentYear || "",
      schoolGRNo: initialData?.schoolGRNo || "",
      headmasterName: initialData?.headmasterName || "",
      headmasterContact: initialData?.headmasterContact || "",
    },
  });
  
  const onSubmit = (data) => {
    console.log('Step 4 - Previous School Information:', data);
    onNext(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl p-6 sm:p-8 lg:p-10"
      >
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
            Step {currentStep} of {totalSteps}: Previous School Information
          </h2>

          <div className="grid grid-cols-1 gap-5">
            <ControlledInputField
              name="schoolName"
              control={control}
              label="School Name"
              placeholder="Enter school name"
              required
              errors={errors}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ControlledRadioGroup
                name="schoolCategory"
                control={control}
                label="School Category"
                options={schoolCategoryOptions}
                required
                errors={errors}
              />

              <ControlledInputField
                name="schoolSemisCode"
                control={control}
                label="School SEMIS/Code"
                placeholder="Enter SEMIS/Code"
                required
                errors={errors}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  Currently Studying in Class{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="studyingInClass"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={classOptions}
                      styles={customSelectStyles(errors)}
                      placeholder="Select class"
                      isClearable
                    />
                  )}
                />
                {errors.studyingInClass && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.studyingInClass.message}
                  </span>
                )}
              </div>

              <ControlledInputField
                name="enrollmentYear"
                control={control}
                label="Year of Enrollment"
                type="tel"
                placeholder="2023"
                maxLength={4}
                required
                errors={errors}
              />

              <ControlledInputField
                name="schoolGRNo"
                control={control}
                label="School GR No"
                placeholder="Enter GR number"
                required
                errors={errors}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ControlledInputField
                name="headmasterName"
                control={control}
                label="Headmaster/Headmistress Name"
                placeholder="Enter name"
                required
                errors={errors}
              />

              <ControlledInputField
                name="headmasterContact"
                control={control}
                label="Headmaster Contact"
                type="tel"
                placeholder="03001234567"
                maxLength={11}
                required
                errors={errors}
                helpText="Must start with 03"
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg shadow hover:shadow-lg hover:bg-gray-300 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            ← Previous
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Next Step →
          </button>
        </div>
      </form>
    </div>
  );
};