import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { step5Schema } from "../../schema/admission-form-schema";
import FormTemplate from "../../template/form-template";
import { useNavigate } from "react-router-dom";
import { useAddApplicantTestPreference, useGetApplicantTestPreference } from "../../../../api/client/applicant";
import Button from "../../button";
import { customSelectStyles } from "../../../styles/custom-styles";
import Select from "react-select";

export const Form6 = () => {
  const { addTestPreference, isSuccess, isPending, isError, error } = useAddApplicantTestPreference();
  const { data, isLoading } = useGetApplicantTestPreference();

  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step5Schema),
    defaultValues: {
      firstPriority: null,
      secondPriority: null,
      thirdPriority: null,
    },
  });

  const onSubmit = async (formData) => {
    console.log("School Preferences:", formData);
    // addTestPreference(formData)
  };

  const schools = data?.map(item => ({ value: item.school_name, label: item.school_name })) || [];
  
  const firstPriority = watch("firstPriority");
  const secondPriority = watch("secondPriority");

  // Filter out already selected schools
  const getAvailableSchools = (excludeFields = []) => {
    const selectedValues = excludeFields.map(field => watch(field)?.value).filter(Boolean);
    return schools.filter(school => !selectedValues.includes(school.value));
  };

  return (
    <FormTemplate>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl p-6 sm:p-8 lg:p-10"
      >
        <div className="mb-8">
          
          <div className="space-y-6">
            {/* First Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                1st Priority School <span className="text-red-500">*</span>
              </label>
              <Controller
                name="firstPriority"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={getAvailableSchools(["secondPriority", "thirdPriority"])}
                    styles={customSelectStyles(errors)}
                    placeholder="Select 1st Priority School"
                    isClearable
                    isLoading={isLoading}
                  />
                )}
              />
              {errors.firstPriority && (
                <p className="text-red-500 text-sm mt-1">{errors.firstPriority.message}</p>
              )}
            </div>

            {/* Second Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                2nd Priority School <span className="text-red-500">*</span>
              </label>
              <Controller
                name="secondPriority"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={getAvailableSchools(["firstPriority", "thirdPriority"])}
                    styles={customSelectStyles(errors)}
                    placeholder="Select 2nd Priority School"
                    isClearable
                    isLoading={isLoading}
                    isDisabled={!firstPriority}
                  />
                )}
              />
              {errors.secondPriority && (
                <p className="text-red-500 text-sm mt-1">{errors.secondPriority.message}</p>
              )}
            </div>

            {/* Third Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3rd Priority School <span className="text-red-500">*</span>
              </label>
              <Controller
                name="thirdPriority"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={getAvailableSchools(["firstPriority", "secondPriority"])}
                    styles={customSelectStyles(errors)}
                    placeholder="Select 3rd Priority School"
                    isClearable
                    isLoading={isLoading}
                    isDisabled={!secondPriority}
                  />
                )}
              />
              {errors.thirdPriority && (
                <p className="text-red-500 text-sm mt-1">{errors.thirdPriority.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/form/document-upload-6')}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg shadow hover:shadow-lg hover:bg-gray-300 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            ← Previous
          </button>
          <Button
            isLoading={isPending}
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Next Step →
          </Button>
        </div>
      </form>
    </FormTemplate>
  );
};

export default Form6;