import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from 'react-hook-form';
import { ControlledInputField } from '../../input-field';
import { step2Schema } from "../../schema/admission-form-schema";
import FormTemplate from "../../template/form-template";
import { useNavigate } from "react-router-dom";
import { useAddApplicantGuardianInfo, useGetApplicantGuardianInfo } from "../../../../api/client/applicant";
import ProtectedRouteForm from "../../../../utils/protected-route-form";
import Button from "../../button";
import { divisionData } from "../../../../data/districtData";
import Select from "react-select";
import { customSelectStyles } from "../../../styles/custom-styles";
import { guardianrelation } from "../../../../data/form-data";

export const Form2 = () => {
  const districtOptions = divisionData
    .flatMap(d => d.districts)
    .map(d => ({ label: d.district, value: d.district }));


  const navigate = useNavigate()
  const { addApplicantGuardian, isSuccess, isPending, isError, error } = useAddApplicantGuardianInfo()
  const { data, isLoading } = useGetApplicantGuardianInfo()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step2Schema),
    defaultValues: {
      guardianName: "",
      guardianCNIC: "",
      guardianDomicileDistrict: "",
      guardianProfession: "",
      guardianannualIncome: "",
      relation: "",
      guardianContactNumber: "",
      guardianContactWhattsappNumber: ""
    },
  });

  const onSubmit = (data) => {
    // console.log('Step 2 - Father/Guardian Information:', data);
    addApplicantGuardian(data)
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
              name="guardianName"
              control={control}
              label="Name (Father/Guardian )"
              placeholder="Enter Father's / Guardian name"
              required
              errors={errors}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ControlledInputField
                name="guardianCNIC"
                control={control}
                label="CNIC (Father/Guardian )"
                placeholder="12345-1234567-1"
                maxLength={15}
                required
                errors={errors}
                helpText="Format: 12345-1234567-1"
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  District of Domicile (Father/Guardian) <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="guardianDomicileDistrict"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={districtOptions}
                      styles={customSelectStyles(errors)}
                      placeholder="District of Domicile (Father/Guardian)"
                      isClearable
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      value={districtOptions.find(opt => opt.value === field.value) || null}
                      onChange={(option) => field.onChange(option ? option.value : "")}
                    />
                  )}
                />
                {errors.guardianDomicileDistrict && (
                  <p className="text-red-500 text-sm mt-1">{errors.guardianDomicileDistrict.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ControlledInputField
                name="guardianProfession"
                control={control}
                label="Profession (Father/Guardian's)"
                placeholder="Enter profession of Father/Guardian"
                required
                errors={errors}
              />

              <ControlledInputField
                name="guardianannualIncome"
                control={control}
                label="Annual Income (Father/Guardian's)"
                type="number"
                placeholder="Enter annual income in PKR"
                required
                errors={errors}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Relation (Guardian)
                </label>
                <Controller
                  name="relation"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={guardianrelation}
                      styles={customSelectStyles(errors)}
                      placeholder="Select Relation (Guardian) if Applicable"
                      isClearable
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      value={guardianrelation.find(opt => opt.value === field.value) || null}
                      onChange={(option) => field.onChange(option ? option.value : "")}
                    />
                  )}
                />
                {errors.relation && (
                  <p className="text-red-500 text-sm mt-1">{errors.relation.message}</p>
                )}
              </div>

              <ControlledInputField
                name="guardianContactNumber"
                control={control}
                label="Phone Number"
                type="tel"
                placeholder="03001234567"
                maxLength={11}
                required
                errors={errors}
                helpText="Must start with 03"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <ControlledInputField
                name="guardianContactWhattsappNumber"
                control={control}
                label="WhatsApp Number"
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
            onClick={() => navigate('/form/student-info-1')}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg shadow hover:shadow-lg hover:bg-gray-300 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            ← Previous
          </button>

          <Button isLoading={isPending} type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Next Step →
          </Button>
        </div>
      </form>
    </FormTemplate>
  );
};