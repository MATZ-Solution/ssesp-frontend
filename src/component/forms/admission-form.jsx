import React, { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { validationSchema } from '../schema/admission-form-schema';
import { citiesData } from '../../../data/city-data';
import { ControlledInputField } from '../input-field';
import { ControlledRadioGroup } from '../radio-button';
import { ControlledCheckbox } from '../check-box';
import { religionOptions, genderOptions, schoolCategoryOptions, testMediumOptions, classOptions } from '../../../data/form-data';
import { customSelectStyles } from '../../styles/custom-styles';
import { useProvinceOptions, useDistrictOptions, useCityOptions } from '../../../utils/locationOption';

const AdmissionForm = () => {

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      studentName: "",
      gender: "",
      studentBForm: "",
      dob: "",
      religion: null,
      fatherName: "",
      fatherCNIC: "",
      domicileDistrict: "",
      guardianName: "",
      guardianContact: "",
      contact1: "",
      contact2: "",
      postalAddress: "",
      province: null,
      district: null,
      city: null,
      schoolName: "",
      schoolCategory: "",
      schoolSemisCode: "",
      studyingInClass: null,
      enrollmentYear: "",
      schoolGRNo: "",
      headmasterName: "",
      headmasterContact: "",
      testMedium: "",
      division: "",
      photo: null,
      acknowledgment: false,
    },
  });

  const province = watch("province")
  const district = watch("district")
  const city = watch("city")

  const provinceOptions = useProvinceOptions(citiesData);
  const districtOptions = useDistrictOptions(citiesData, province);
  const cityOptions = useDistrictOptions(citiesData, province, district);

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        religion: data.religion?.value,
        province: data.province?.value,
        district: data.district?.value,
        city: data.city?.value,
        studyingInClass: data.studyingInClass?.value,
        photo: data.photo?.[0],
      };

      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form Data:', formData);

      if (formData.photo) {
        console.log("Photo details:", {
          name: formData.photo.name,
          size: formData.photo.size,
          type: formData.photo.type,
        });
      }

      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
        reset();
        setPhotoPreview(null);
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-t-2xl shadow-lg p-6 sm:p-8 text-white">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              Sindh School Education Scholarship Program (SSESP)
            </h1>
            <p className="text-lg sm:text-xl font-semibold">
              GOVERNMENT OF SINDH
            </p>
            <p className="text-base sm:text-lg">SINDH EDUCATION FOUNDATION</p>
            <p className="mt-4 text-sm sm:text-base bg-white/20 backdrop-blur-sm rounded-lg py-2 px-4 inline-block">
              Application Form for Students of Government and SEF Schools in
              Grade 6
            </p>
            <p className="text-sm mt-2">Session 2023-24</p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-b-2xl shadow-xl p-6 sm:p-8 lg:p-10"
        >
          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg animate-pulse">
              <p className="font-bold">Success!</p>
              <p>Your application has been submitted successfully.</p>
            </div>
          )}

          {/* Section 1: Student Information */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
              Student Information
            </h2>

            <div className="grid grid-cols-1 gap-5">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> Enter student name as per NADRA B-Form
                  in CAPITAL LETTERS only
                </p>
              </div>

              {/* Photo Upload Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left side - Form fields */}
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
                          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${errors.dob ? 'border-red-500 bg-red-50' : 'border-gray-300'
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
                          {...field}
                          options={religionOptions}
                          styles={customSelectStyles(errors)}
                          placeholder="Select religion"
                          isClearable
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

                {/* Right side - Square Photo Upload */}
                <div className="lg:col-span-1">
                  <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                    Upload Student Photo <span className="text-red-500">*</span>
                  </label>

                  <Controller
                    name="photo"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center w-full">
                          <label className={`flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed rounded-lg cursor-pointer transition-all ${errors.photo
                              ? 'border-red-500 bg-red-50 hover:bg-red-100'
                              : photoPreview
                                ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                            }`}>
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

                                  if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                                    alert('Only JPG, JPEG, and PNG files are allowed');
                                    return;
                                  }

                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setPhotoPreview(reader.result);
                                  };
                                  reader.readAsDataURL(file);

                                  onChange(e.target.files);
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
                  {errors.photo && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.photo.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Father/Guardian Information */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
              Father/Guardian Information
            </h2>

            <div className="grid grid-cols-1 gap-5">
              <ControlledInputField
                name="fatherName"
                control={control}
                label="Father's Name"
                placeholder="Enter father's name"
                required
                errors={errors}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ControlledInputField
                  name="fatherCNIC"
                  control={control}
                  label="Father's CNIC"
                  placeholder="12345-1234567-1"
                  maxLength={15}
                  required
                  errors={errors}
                  helpText="Format: 12345-1234567-1"
                />

                <ControlledInputField
                  name="domicileDistrict"
                  control={control}
                  label="District of Domicile (Father)"
                  placeholder="Enter district"
                  required
                  errors={errors}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ControlledInputField
                  name="guardianName"
                  control={control}
                  label="Guardian's Name"
                  placeholder="Enter guardian's name (if applicable)"
                  errors={errors}
                />

                <ControlledInputField
                  name="guardianContact"
                  control={control}
                  label="Guardian's Contact"
                  type="tel"
                  placeholder="03001234567"
                  maxLength={11}
                  errors={errors}
                  helpText="Must start with 03"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ControlledInputField
                  name="contact1"
                  control={control}
                  label="Contact Number 1"
                  type="tel"
                  placeholder="03001234567"
                  maxLength={11}
                  required
                  errors={errors}
                  helpText="Must start with 03"
                />

                <ControlledInputField
                  name="contact2"
                  control={control}
                  label="Contact Number 2"
                  type="tel"
                  placeholder="03001234567"
                  maxLength={11}
                  errors={errors}
                  helpText="Must start with 03"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Address Information */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
              Address Information
            </h2>

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
                          // setSelectedProvince(value);
                          // setSelectedDistrict(null);
                          // setValue('district', null);
                          // setValue('city', null);
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
                          // setSelectedDistrict(value);
                          // setValue('city', null);
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

          {/* Section 4: Previous School Information */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
              Previous School Information
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

          {/* Section 5: Entry Test Preference */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
              Entry Test Preference
            </h2>

            <div className="grid grid-cols-1 gap-5">
              <ControlledRadioGroup
                name="testMedium"
                control={control}
                label="Medium of Instructions for Entry Test"
                options={testMediumOptions}
                required
                errors={errors}
              />

              <ControlledInputField
                name="division"
                control={control}
                label="Division"
                placeholder="Enter division"
                required
                errors={errors}
              />
            </div>
          </div>

          {/* Entry Test Criteria Information */}
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-4">
              Entry Test Criteria
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="px-4 py-2 text-left">Subject</th>
                    <th className="px-4 py-2 text-left">Required Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-200">
                  <tr>
                    <td className="px-4 py-2">English</td>
                    <td className="px-4 py-2">Minimum 60% (weightage 30%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Maths</td>
                    <td className="px-4 py-2">Minimum 60% (weightage 30%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Sindhi/Urdu</td>
                    <td className="px-4 py-2">Minimum 60% (weightage 20%)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Interview</td>
                    <td className="px-4 py-2">Weightage 20%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="mb-8 bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-bold text-green-900 mb-4">
              Eligibility Criteria
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>
                  Must be currently studying in Grade V/Class 5 (bonafide)
                  student of Government School or SEF School
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>
                  Must have studied in any Government School or SEF School for
                  at least last three academic years including Grade 5
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>
                  Age should not exceed eleven years as on 13th April, 2023
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Must be a resident of the Karachi Division</span>
              </li>
            </ul>
          </div>

          {/* Documents Required */}
          <div className="mb-8 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-bold text-orange-900 mb-4">
              Documents Required
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Duly filled Admission/Application Form along with 1 passport size recent photographs (with Blue background)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>
                  Photocopy of General Register (GR) page duly attested by
                  concerned Head Master/Head Mistress
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>
                  School leaving Certificate / Pass Certificate will be required
                  at the time of admission
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>
                  Photocopies of Student's B-Form, Father's Domicile and
                  Father's CNIC
                </span>
              </li>
            </ul>
          </div>

          {/* Acknowledgment */}
          <ControlledCheckbox
            name="acknowledgment"
            control={control}
            label={
              <>
                I hereby declare that all the information provided above is true and correct to the best of my knowledge.
                I understand that admission will be subject to verification of documents and that SEF reserves the right to
                reject the application at any stage in case of omission or misrepresentation. <span className="text-red-500">*</span>
              </>
            }
            errors={errors}
          />

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 bg-gradient-to-r from-green-800 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                reset();
                // setSelectedProvince(null);
                // setSelectedDistrict(null);
                setPhotoPreview(null);
              }}
              className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-lg shadow hover:shadow-lg hover:bg-gray-300 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Reset Form
            </button>
          </div>

          {/* Footer Information */}
          <div className="mt-8 text-center text-sm text-gray-600 space-y-1">
            <p>For further details and updates please visit:</p>
            <p className="font-semibold text-blue-600">
              www.psg.edu.pk | http://sef.org.pk
            </p>
            <p className="mt-4 text-xs text-gray-500">
              Public School Gadap, Karachi, 22 km of Super Highway Main Gadap,
              Road, Gadap Town, Karachi
            </p>
          </div>
        </form>
      </div>

      <SuccessModal
        open={submitSuccess}
        onClose={() => {
          setSubmitSuccess(false);
          reset();
          setSelectedProvince(null);
          setSelectedDistrict(null);
          setPhotoPreview(null);
        }}
      />

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
    </div>
  );
};

export default AdmissionForm;
