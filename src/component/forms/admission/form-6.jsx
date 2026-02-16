import { useEffect } from "react";
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step5Schema),
    defaultValues: {
      priority: []
    },
  });

  // Reset form when data is loaded
  useEffect(() => {
    if (data && data.length > 0) {
      reset({
        priority: data.map((_, index) => ({
          schoolName: null,
          priority: index + 1
        }))
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    
    const validPriorities = formData.priority.filter(p => p.schoolName !== null);
    if (validPriorities.length === 0) {
      console.log("No schools selected");
      return;
    }
    
    addSchoolPreference({ priority: validPriorities });
  };

  const schools =
    data?.map((item) => ({
      value: item.school_name,
      label: item.school_name,
    })) || [];

  const watchedPriorities = watch("priority");

  const getAvailableSchools = (currentIndex) => {
    const selectedSchools = watchedPriorities
      ?.map((p, idx) => idx !== currentIndex ? p?.schoolName : null)
      .filter(Boolean) || [];

    return schools.filter((school) =>
      !selectedSchools.includes(school.value)
    );
  };

  return (
    <FormTemplate>
      {
        isLoading ?
          <div className="flex flex-col items-center justify-center mt-10">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[#4BA54F] rounded-full animate-spin border-t-transparent"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading...</p>
          </div>
          :
          (data && data?.length > 0) ?
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white shadow-xl p-6 sm:p-8 lg:p-10"
            >
              <div className="mb-8 space-y-6">
                {data?.map((_, index) => {
                  const priorityNumber = index + 1;
                  const ordinal = priorityNumber === 1 ? "1st" :
                    priorityNumber === 2 ? "2nd" :
                      priorityNumber === 3 ? "3rd" :
                        `${priorityNumber}th`;

                  return (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {ordinal} Priority School <span className="text-red-500">*</span>
                      </label>

                      <Controller
                        name={`priority.${index}.schoolName`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            options={getAvailableSchools(index)}
                            styles={customSelectStyles(errors)}
                            placeholder={`Select ${ordinal} Priority School`}
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
                      {errors.priority?.[index]?.schoolName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.priority[index].schoolName.message}
                        </p>
                      )}
                    </div>
                  );
                })}
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
            :
            <p className="mt-10 text-center">No School Found</p>
      }
    </FormTemplate>
  );
};

export default Form6;