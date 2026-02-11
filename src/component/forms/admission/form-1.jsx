import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { genderOptions, religionOptions } from "../../../../data/form-data";
import { customSelectStyles } from "../../../styles/custom-styles";
import { ControlledRadioGroup } from "../../Radio-button";
import { ControlledInputField } from '../../input-field';
import Select from 'react-select';
import { step1Schema } from "../../schema/admission-form-schema";
import FormTemplate from "../../template/form-template";
import { useAddApplicantInfo, useGetApplicantInfo } from "../../../../api/client/applicant";
import ProtectedRouteForm from "../../../../utils/protected-route-form";

export const Form1 = ({ initialData = {} }) => {

  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const { addApplicant, isSuccess, isPending, isError, error } = useAddApplicantInfo()
  const { data, isLoading } = useGetApplicantInfo()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step1Schema),
    defaultValues: {
      studentName: initialData.studentName || "",
      gender: initialData.gender || "",
      studentBForm: initialData.studentBForm || "",
      dob: initialData.dob || "",
      religion: initialData.religion || null,
      files: initialData.files || null,
    },
  });

  useEffect(() => {
    if (initialData.photoPreview) {
      setPhotoPreview(initialData.photoPreview);
    }
  }, [initialData.photoPreview]);

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(`${key}`, value));
    addApplicant(formData);
  };

  return (
      <FormTemplate>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl p-6 sm:p-8 lg:p-10"
        >
          <div className="mb-8">

            <div className="grid grid-cols-1 gap-5">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Enter student name as per NADRA B-Form
                  in CAPITAL LETTERS only
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">
                  <ControlledInputField
                    name="studentName"
                    control={control}
                    label="Student Name (As per NADRA B-Form)"
                    placeholder="ENTER NAME IN CAPITAL LETTERS"
                    required
                    errors={errors}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <ControlledRadioGroup
                      name="gender"
                      control={control}
                      label="Gender"
                      options={genderOptions}
                      required
                      errors={errors}
                    />

                    <ControlledInputField
                      name="studentBForm"
                      control={control}
                      label="Student B-Form"
                      placeholder="12345-1234567-1"
                      maxLength={15}
                      required
                      errors={errors}
                      helpText="Format: 12345-1234567-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="date"
                          min="2012-01-01"
                          max="2018-12-31"
                          value={field.value || ""}
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.dob
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                            }`}
                        />
                      )}
                    />
                    {errors.dob && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.dob.message}
                      </span>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      Select date between 2012-2018
                    </p>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-gray-700 mb-1.5">
                      Religion <span className="text-red-500">*</span>
                    </label>
                    <Controller
                      name="religion"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={religionOptions}
                          styles={customSelectStyles(errors)}
                          placeholder="Select religion"
                          isClearable

                          // what react-select displays
                          value={religionOptions.find(
                            (option) => option.value === field.value
                          ) || null}

                          // what gets stored in RHF
                          onChange={(selected) =>
                            field.onChange(selected ? selected.value : null)
                          }
                        />
                      )}
                    />

                    {errors.religion && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.religion.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="lg:col-span-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                    Upload Student Photo <span className="text-red-500">*</span>
                  </label>

                  <Controller
                    name="files"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center w-full">
                          <label
                            className={`flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed rounded-lg cursor-pointer transition-all ${errors.files
                              ? "border-red-500 bg-red-50 hover:bg-red-100"
                              : photoPreview
                                ? "border-green-500 bg-green-50 hover:bg-green-100"
                                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                              }`}
                          >
                            <div className="flex flex-col items-center justify-center p-4">
                              {photoPreview ? (
                                <div className="relative w-full h-full flex items-center justify-center">
                                  <img
                                    src={photoPreview}
                                    alt="Student preview"
                                    className="max-w-full max-h-full object-contain rounded-lg shadow-md cursor-pointer"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setShowPhotoModal(true);
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setPhotoPreview(null);
                                      onChange(null);
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg"
                                  >
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <>
                                  <svg
                                    className="w-12 h-12 mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                  </svg>
                                  <p className="mb-2 text-xs text-center text-gray-500">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>
                                  </p>
                                  <p className="text-xs text-gray-500 text-center">
                                    JPG, JPEG, PNG
                                  </p>
                                  <p className="text-xs text-gray-500 text-center">
                                    (MAX. 5MB)
                                  </p>
                                  <p className="text-xs text-blue-600 mt-2 font-semibold">
                                    Blue Background
                                  </p>
                                </>
                              )}
                            </div>
                            <input
                              {...field}
                              type="file"
                              accept="image/jpeg,image/jpg,image/png"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  if (file.size > 5 * 1024 * 1024) {
                                    alert("File size must not exceed 5MB");
                                    return;
                                  }

                                  if (
                                    ![
                                      "image/jpeg",
                                      "image/jpg",
                                      "image/png",
                                    ].includes(file.type)
                                  ) {
                                    alert(
                                      "Only JPG, JPEG, and PNG files are allowed"
                                    );
                                    return;
                                  }

                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setPhotoPreview(reader.result);
                                  };
                                  reader.readAsDataURL(file);

                                  onChange(file);
                                }
                              }}
                            />
                          </label>
                        </div>

                        {photoPreview && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                            <p className="text-xs text-green-700 flex items-center">
                              <svg
                                className="w-4 h-4 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Photo uploaded
                            </p>
                          </div>
                        )}

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-xs text-blue-800 font-semibold mb-1">
                            Requirements:
                          </p>
                          <ul className="text-xs text-blue-700 space-y-0.5">
                            <li>• Passport size</li>
                            <li>• Blue background</li>
                            <li>• Clear & recent</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  />
                  {errors.files && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.files.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Next Step →
            </button>
          </div>
        </form>

        {/* Photo Modal */}
        {showPhotoModal && photoPreview && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPhotoModal(false)}
          >
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setShowPhotoModal(false)}
                className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 shadow-lg z-10"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={photoPreview}
                alt="Student photo enlarged"
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </FormTemplate>
  );
};