import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { ControlledInputField } from "../../input-field";
import { customSelectStyles } from "../../../styles/custom-styles";
import Select from "react-select";
import {
  classOptions,
  schoolCategoryOptions,
} from "../../../../data/form-data";
import { ControlledRadioGroup } from "../../Radio-button";
import { step4Schema } from "../../schema/admission-form-schema";
import FormTemplate from "../../template/form-template";
import { useNavigate } from "react-router-dom";
import {
  useAddApplicantSchoolInfo,
  useGetApplicantSchoolInfo,
} from "../../../../api/client/applicant";
import Button from "../../button";
import { divisionData } from "../../../../data/districtData";

// Class options restricted to 8 and 7 only
const studyingClassOptions = [
  { label: "Class 8", value: "8" },
  { label: "Class 7", value: "7" },
];

// Class 7 => records for Class 5, 6, 7
// Class 8 => records for Class 6, 7, 8
const getPreviousClassDefaults = (studyingClass) => {
  const classes = studyingClass === "7" ? ["4", "5", "6"] : ["5", "6", "7"];
  return classes.map((cls) => ({
    class: cls,
    schoolCategory: "",
    semisCode: "",
    district: "",
    yearOfPassing: "",
  }));
};

export const Form4 = () => {
  const navigate = useNavigate();

  const { addApplicantSchool, isSuccess, isPending, isError, error } = useAddApplicantSchoolInfo();
  const { data, isLoading } = useGetApplicantSchoolInfo();

  const districtOptions = divisionData
    .flatMap((d) => d.districts)
    .map((d) => ({ label: d.district, value: d.district }));

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step4Schema),
    defaultValues: {
      schoolName: "",
      schoolCategory: "",
      schoolSemisCode: "",
      studyingInClass: null,
      enrollmentYear: "",
      schoolGRNo: "",
      headmasterName: "",
      previous_school: [],
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "previous_school",
  });

  // Watch the studyingInClass field
  const selectedClass = watch("studyingInClass");

  // When studyingInClass changes, replace previous_school rows accordingly
  const handleClassChange = (value) => {
    setValue("studyingInClass", value);
    if (value === "8" || value === "7") {
      replace(getPreviousClassDefaults(value));
    } else {
      replace([]);
    }
  };

const onSubmit = (data) => {
  const formattedData = {
    ...data,
    studyingInClass: data.studyingInClass
      ? `Class ${data.studyingInClass}`
      : null,

    previous_school: data.previous_school.map((item) => ({
      ...item,
      class: `Class ${item.class}`,
    })),
  };

  addApplicantSchool(formattedData);
  console.log("Form 4 Data:", formattedData);
};


  console.log("errors: ", errors)

  return (
    <FormTemplate>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl p-4 sm:p-6 md:p-8 lg:p-10"
      >
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            <ControlledInputField
              name="schoolName"
              control={control}
              label="School Name"
              placeholder="Currently Enrolled School Name"
              required
              errors={errors}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
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
                type="text"
                maxLength={9}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 9);
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
                      options={studyingClassOptions}
                      styles={customSelectStyles(errors)}
                      placeholder="Select class"
                      isClearable
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      value={
                        studyingClassOptions.find(
                          (opt) => opt.value === field.value
                        ) || null
                      }
                      onChange={(option) => {
                        const val = option ? option.value : null;
                        handleClassChange(val);
                      }}
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
                label="Currently Enrolled School GR No"
                placeholder="Enter GR number"
                required
                errors={errors}
              />
            </div>

            <div className="grid grid-cols-1">
              <ControlledInputField
                name="headmasterName"
                control={control}
                label="Headmaster / Principal Name"
                placeholder="Enter name"
                required
                errors={errors}
              />
            </div>

            {/* Tabular Form - Dynamic Previous Class Records */}
            <div className="mt-6 sm:mt-8">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                Previous Class Records{" "}
                {selectedClass === "8"
                  ? "(Class 5 to 7)"
                  : selectedClass === "7"
                  ? "(Class 4 to 6)"
                  : "(Class 4 to 6 / 5 to 7)"}
                <span className="text-red-500"> *</span>
              </h3>

              {fields.length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  Please select a class above to load previous class records.
                </p>
              )}

              {/* Desktop/Tablet Table View */}
              {fields.length > 0 && (
                <div className="hidden md:block -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap">
                              Class
                            </th>
                            <th className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap">
                              School Category{" "}
                              <span className="text-red-500">*</span>
                            </th>
                            <th className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap">
                              School / SEMIS Code{" "}
                              <span className="text-red-500">*</span>
                            </th>
                            <th className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap">
                              District <span className="text-red-500">*</span>
                            </th>
                            <th className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3 text-left text-xs lg:text-sm font-semibold text-gray-700 whitespace-nowrap">
                              Year of Passing{" "}
                              <span className="text-red-500">*</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {fields.map((field, index) => (
                            <tr key={field.id} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3">
                                <span className="font-semibold text-gray-700 text-sm lg:text-base">
                                  Class {field.class}
                                </span>
                              </td>
                              <td className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3">
                                <Controller
                                  name={`previous_school.${index}.schoolCategory`}
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={schoolCategoryOptions}
                                      styles={customSelectStyles(errors)}
                                      placeholder="Select"
                                      isClearable
                                      menuPortalTarget={document.body}
                                      menuPosition="fixed"
                                      value={
                                        schoolCategoryOptions.find(
                                          (opt) => opt.value === field.value
                                        ) || null
                                      }
                                      onChange={(option) =>
                                        field.onChange(
                                          option ? option.value : ""
                                        )
                                      }
                                    />
                                  )}
                                />
                                {errors.previous_school?.[index]
                                  ?.schoolCategory && (
                                  <span className="text-red-500 text-xs mt-1 block">
                                    {
                                      errors.previous_school[index]
                                        .schoolCategory.message
                                    }
                                  </span>
                                )}
                              </td>
                              <td className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3">
                                <Controller
                                  name={`previous_school.${index}.semisCode`}
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="text"
                                      placeholder="SEMIS Code"
                                      maxLength={9}
                                      onInput={(e) => {
                                        e.target.value = e.target.value
                                          .replace(/\D/g, "")
                                          .slice(0, 9);
                                      }}
                                      className="w-full px-2 lg:px-3 py-1.5 lg:py-2 text-sm lg:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  )}
                                />
                                {errors.previous_school?.[index]?.semisCode && (
                                  <span className="text-red-500 text-xs mt-1 block">
                                    {
                                      errors.previous_school[index].semisCode
                                        .message
                                    }
                                  </span>
                                )}
                              </td>
                              <td className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3">
                                <Controller
                                  name={`previous_school.${index}.district`}
                                  control={control}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={districtOptions}
                                      styles={customSelectStyles(errors)}
                                      placeholder="Select District"
                                      isClearable
                                      menuPortalTarget={document.body}
                                      menuPosition="fixed"
                                      value={
                                        districtOptions.find(
                                          (opt) => opt.value === field.value
                                        ) || null
                                      }
                                      onChange={(option) =>
                                        field.onChange(
                                          option ? option.value : ""
                                        )
                                      }
                                    />
                                  )}
                                />
                                {errors.previous_school?.[index]?.district && (
                                  <span className="text-red-500 text-xs mt-1 block">
                                    {
                                      errors.previous_school[index].district
                                        .message
                                    }
                                  </span>
                                )}
                              </td>
                              <td className="border border-gray-300 px-3 lg:px-4 py-2 lg:py-3">
                                <Controller
                                  name={`previous_school.${index}.yearOfPassing`}
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="tel"
                                      placeholder="2023"
                                      maxLength={4}
                                      className="w-full px-2 lg:px-3 py-1.5 lg:py-2 text-sm lg:text-base border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                  )}
                                />
                                {errors.previous_school?.[index]
                                  ?.yearOfPassing && (
                                  <span className="text-red-500 text-xs mt-1 block">
                                    {
                                      errors.previous_school[index].yearOfPassing
                                        .message
                                    }
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Card View */}
              {fields.length > 0 && (
                <div className="md:hidden space-y-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border border-gray-300 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="mb-3 pb-2 border-b border-gray-300">
                        <span className="font-bold text-gray-800 text-base">
                          Class {field.class}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            School Category{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Controller
                            name={`previous_school.${index}.schoolCategory`}
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={schoolCategoryOptions}
                                styles={customSelectStyles(errors)}
                                placeholder="Select"
                                isClearable
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                value={
                                  schoolCategoryOptions.find(
                                    (opt) => opt.value === field.value
                                  ) || null
                                }
                                onChange={(option) =>
                                  field.onChange(option ? option.value : "")
                                }
                              />
                            )}
                          />
                          {errors.previous_school?.[index]?.schoolCategory && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {
                                errors.previous_school[index].schoolCategory
                                  .message
                              }
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            SEMIS Code <span className="text-red-500">*</span>
                          </label>
                          <Controller
                            name={`previous_school.${index}.semisCode`}
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                placeholder="Enter SEMIS Code"
                                maxLength={9}
                                onInput={(e) => {
                                  e.target.value = e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 9);
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            )}
                          />
                          {errors.previous_school?.[index]?.semisCode && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.previous_school[index].semisCode.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            District <span className="text-red-500">*</span>
                          </label>
                          <Controller
                            name={`previous_school.${index}.district`}
                            control={control}
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={districtOptions}
                                styles={customSelectStyles(errors)}
                                placeholder="Select District"
                                isClearable
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                value={
                                  districtOptions.find(
                                    (opt) => opt.value === field.value
                                  ) || null
                                }
                                onChange={(option) =>
                                  field.onChange(option ? option.value : "")
                                }
                              />
                            )}
                          />
                          {errors.previous_school?.[index]?.district && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {errors.previous_school[index].district.message}
                            </span>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Year of Passing{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <Controller
                            name={`previous_school.${index}.yearOfPassing`}
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="tel"
                                placeholder="2023"
                                maxLength={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            )}
                          />
                          {errors.previous_school?.[index]?.yearOfPassing && (
                            <span className="text-red-500 text-xs mt-1 block">
                              {
                                errors.previous_school[index].yearOfPassing
                                  .message
                              }
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-6 sm:mt-8">
          <button
            type="button"
            onClick={() => navigate("/form/address-3")}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg shadow hover:shadow-lg hover:bg-gray-300 transform hover:-translate-y-0.5 transition-all duration-200 order-2 sm:order-1"
          >
            ← Previous
          </button>
          <Button
            isLoading={isPending}
            type="submit"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 order-1 sm:order-2"
          >
            Next Step →
          </Button>
        </div>
      </form>
    </FormTemplate>
  );
};