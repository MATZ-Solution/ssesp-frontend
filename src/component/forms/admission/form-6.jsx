import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { step5Schema } from "../../schema/admission-form-schema";
import FormTemplate from "../../template/form-template";
import { useNavigate } from "react-router-dom";
import {
  useAddApplicantSchoolPreference,
  useGetApplicantSchoolPreference,
} from "../../../../api/client/applicant";
import Button from "../../button";
import { customSelectStyles } from "../../../styles/custom-styles";
import Select from "react-select";

export const Form6 = () => {

  const { addSchoolPreference, isPending } =
    useAddApplicantSchoolPreference();

  const { data, isLoading } = useGetApplicantSchoolPreference();

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step5Schema),
    defaultValues: {
      first_priority_school: null,
      second_priority_school: null,
      third_priority_school: null,
    },
  });

  const onSubmit = async (formData) => {
    console.log("School Preferences:", formData);
    addSchoolPreference(formData);
  };

  const schools =
    data?.map((item) => ({
      value: item.school_name,
      label: item.school_name,
    })) || [];

  const firstPriority = watch("first_priority_school");
  const secondPriority = watch("second_priority_school");
  const thirdPriority = watch("third_priority_school");

  const getAvailableSchools = (currentValue) => {
    return schools.filter((school) => {
      if (school.value === currentValue) return true;

      return (
        school.value !== firstPriority &&
        school.value !== secondPriority &&
        school.value !== thirdPriority
      );
    });
  };

  return (
    <FormTemplate>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl p-6 sm:p-8 lg:p-10"
      >
        <div className="mb-8 space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1st Priority School <span className="text-red-500">*</span>
            </label>

            <Controller
              name="first_priority_school"
              control={control}
              render={({ field }) => (
                <Select
                  options={getAvailableSchools(field.value)}
                  styles={customSelectStyles(errors)}
                  placeholder="Select 1st Priority School"
                  isClearable
                  isLoading={isLoading}
                  value={
                    field.value
                      ? { value: field.value, label: field.value }
                      : null
                  }
                  onChange={(option) =>
                    field.onChange(option ? option.value : null)
                  }
                />
              )}
            />

            {errors.first_priority_school && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_priority_school.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2nd Priority School <span className="text-red-500">*</span>
            </label>

            <Controller
              name="second_priority_school"
              control={control}
              render={({ field }) => (
                <Select
                  options={getAvailableSchools(field.value)}
                  styles={customSelectStyles(errors)}
                  placeholder="Select 2nd Priority School"
                  isClearable
                  isLoading={isLoading}
                  isDisabled={!firstPriority}
                  value={
                    field.value
                      ? { value: field.value, label: field.value }
                      : null
                  }
                  onChange={(option) =>
                    field.onChange(option ? option.value : null)
                  }
                />
              )}
            />

            {errors.second_priority_school && (
              <p className="text-red-500 text-sm mt-1">
                {errors.second_priority_school.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              3rd Priority School <span className="text-red-500">*</span>
            </label>

            <Controller
              name="third_priority_school"
              control={control}
              render={({ field }) => (
                <Select
                  options={getAvailableSchools(field.value)}
                  styles={customSelectStyles(errors)}
                  placeholder="Select 3rd Priority School"
                  isClearable
                  isLoading={isLoading}
                  isDisabled={!secondPriority}
                  value={
                    field.value
                      ? { value: field.value, label: field.value }
                      : null
                  }
                  onChange={(option) =>
                    field.onChange(option ? option.value : null)
                  }
                />
              )}
            />

            {errors.third_priority_school && (
              <p className="text-red-500 text-sm mt-1">
                {errors.third_priority_school.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/form/document-upload-6")}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg shadow hover:shadow-lg hover:bg-gray-300 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            ← Previous
          </button>

          <Button
            isLoading={isPending}
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Submit
          </Button>
        </div>
      </form>
    </FormTemplate>
  );
};

export default Form6;
