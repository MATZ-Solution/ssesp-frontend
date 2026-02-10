import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { ControlledInputField } from "../../input-field";
import { useDistrictOptions, useProvinceOptions } from "../../../../utils/locationOption";
import { customSelectStyles } from "../../../styles/custom-styles";
import { citiesData } from "../../../../data/city-data";
import Select from 'react-select';
import { step3Schema } from "../../schema/admission-form-schema";
import FormTemplate from "../../template/form-template";
import { useNavigate } from "react-router-dom";
import { useAddApplicantAddressInfo, useGetApplicantAddressInfo } from "../../../../api/client/applicant";

export const Form3 = () => {
  const navigate = useNavigate()

  const { addApplicantAddress, isSuccess, isPending, isError, error } = useAddApplicantAddressInfo()
  const { data, isLoading } = useGetApplicantAddressInfo()
  console.log("data: ", data)

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(step3Schema),
    defaultValues: {
      postalAddress: "",
      province: null,
      district: null,
      city: null,
    },
  });

  const province = watch("province");
  const district = watch("district");

  const provinceOptions = useProvinceOptions(citiesData);
  const districtOptions = useDistrictOptions(citiesData, province);
  const cityOptions = useDistrictOptions(citiesData, province, district);

  const onSubmit = (data) => {
    console.log('Step 3 - Address Information:', data);
    addApplicantAddress(data)
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  Province <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="province"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={provinceOptions}
                      styles={customSelectStyles(errors)}
                      placeholder="Select province"
                      isClearable
                      onChange={(value) => {
                        field.onChange(value);
                        setValue('district', null);
                        setValue('city', null);
                      }}
                    />
                  )}
                />
                {errors.province && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.province.message}
                  </span>
                )}
              </div>

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
                      isDisabled={!province}
                      onChange={(value) => {
                        field.onChange(value);
                        setValue('city', null);
                      }}
                    />
                  )}
                />
                {errors.district && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.district.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  City <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={cityOptions}
                      styles={customSelectStyles(errors)}
                      placeholder="Select city"
                      isClearable
                      isDisabled={!district}
                    />
                  )}
                />
                {errors.city && (
                  <span className="text-red-500 text-xs mt-1">
                    {errors.city.message}
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
            onClick={() => navigate('/form/guardian-info')}
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
    </FormTemplate>
  );
};