import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ControlledInputField } from "../../input-field";
import { customSelectStyles } from "../../../styles/custom-styles";
import Select from "react-select";
import { step3Schema } from "../../schema/admission-form-schema";
import FormTemplate from "../../template/form-template";
import { useNavigate } from "react-router-dom";
import {
  useAddApplicantAddressInfo,
  useGetApplicantAddressInfo,
} from "../../../../api/client/applicant";
import Button from "../../button";
import { useState, useEffect } from "react";
import { divisionData } from '../../../../data/schools_grouped_by_division_updated_gender';
import { useDivisionDistricts } from '../../../../utils/locationOption';



// --- Form Component ---
export const Form3 = () => {

  const navigate = useNavigate();
  const { addApplicantAddress, isPending } = useAddApplicantAddressInfo();
  const { data } = useGetApplicantAddressInfo();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(step3Schema),
    defaultValues: {
      postalAddress: "",
      division: null,
      district: null,
    },
  });

  const { selectedDivision, setSelectedDivision, divisionOptions, districtOptions } =
    useDivisionDistricts(divisionData);

  const onSubmit = (formData) => {
    console.log("Step 3 - Address Information:", formData);
    addApplicantAddress(formData);
    // navigate('/form/school-info')
  };

  return (
    <FormTemplate>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl p-6 sm:p-8 lg:p-10"
      >
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-5">
            <ControlledInputField
              name="postalAddress"
              control={control}
              label="Postal Address"
              placeholder="Enter complete postal address"
              required
              errors={errors}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Division */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  Division <span className="text-red-500">*</span>
                </label>

                <Controller
                  name="division"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={selectedDivision}
                      options={divisionOptions}
                      styles={customSelectStyles(errors)}
                      placeholder="Select division"
                      isClearable
                      onChange={(value) => {
                        field.onChange(value);
                        setValue("district", null); // reset district
                        setSelectedDivision(value); // update hook state
                      }}
                    />
                  )}
                />

                {errors.division && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.division.message}
                  </span>
                )}
              </div>

              {/* District */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  District <span className="text-red-500">*</span>
                </label>

                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={districtOptions}
                      styles={customSelectStyles(errors)}
                      placeholder="Select district"
                      isClearable
                      isDisabled={!selectedDivision}
                    />
                  )}
                />

                {errors.district && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.district.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/form/guardian-info")}
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
