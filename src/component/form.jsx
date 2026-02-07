import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Validation Schema
const validationSchema = yup.object().shape({
  // Student Information
  studentName: yup
    .string()
    .required('Student name is required')
    .matches(/^[A-Z\s]+$/, 'Name must be in CAPITAL LETTERS only'),
  gender: yup.string().required('Gender is required'),
  studentBForm: yup
    .string()
    .required('Student B-Form is required')
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'B-Form must be in format: 00000-0000000-0'),
  dobDay: yup
    .number()
    .required('Day is required')
    .min(1, 'Invalid day')
    .max(31, 'Invalid day'),
  dobMonth: yup.string().required('Month is required'),
  dobYear: yup
    .number()
    .required('Year is required')
    .min(2012, 'Age should not exceed eleven years')
    .max(2018, 'Invalid year'),
  religion: yup.string().required('Religion is required'),
  
  // Father/Guardian Information
  fatherName: yup.string().required("Father's name is required"),
  fatherCNIC: yup
    .string()
    .required("Father's CNIC is required")
    .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in format: 00000-0000000-0'),
  domicileDistrict: yup.string().required('District of Domicile is required'),
  guardianName: yup.string(),
  guardianContact: yup
    .string()
    .matches(/^(\+92|0)?3\d{9}$/, 'Invalid contact number'),
  contact1: yup
    .string()
    .required('At least one contact number is required')
    .matches(/^(\+92|0)?3\d{9}$/, 'Invalid contact number'),
  contact2: yup
    .string()
    .matches(/^(\+92|0)?3\d{9}$/, 'Invalid contact number'),
  
  // Address Information
  postalAddress: yup.string().required('Postal address is required'),
  city: yup.string().required('City is required'),
  district: yup.string().required('District is required'),
  
  // Previous School Information
  schoolName: yup.string().required('School name is required'),
  schoolCategory: yup.string().required('School category is required'),
  schoolSemisCode: yup.string().required('School SEMIS/Code is required'),
  studyingInClass: yup.string().required('Current class is required'),
  enrollmentYear: yup
    .number()
    .required('Year of enrollment is required')
    .min(2018, 'Invalid year')
    .max(2024, 'Invalid year'),
  schoolGRNo: yup.string().required('School GR No is required'),
  headmasterName: yup.string().required('Headmaster/Headmistress name is required'),
  headmasterContact: yup
    .string()
    .required('Headmaster contact is required')
    .matches(/^(\+92|0)?3\d{9}$/, 'Invalid contact number'),
  
  // Entry Test Preference
  testMedium: yup.string().required('Medium of instruction is required'),
  division: yup.string().required('Division is required'),
  
  // Acknowledgment
  acknowledgment: yup
    .boolean()
    .oneOf([true], 'You must acknowledge the terms and conditions'),
});

const AdmissionForm = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      gender: '',
      schoolCategory: '',
      testMedium: '',
      acknowledgment: false,
    },
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const onSubmit = async (data) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form Data:', data);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        reset();
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const InputField = ({ label, name, type = 'text', placeholder, required = false, pattern }) => (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        pattern={pattern}
        className={`px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
          errors[name] ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs mt-1">{errors[name].message}</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-t-2xl shadow-lg p-6 sm:p-8 text-white">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              Sindh School Education Scholarship Program (SSESP)
            </h1>
            <p className="text-lg sm:text-xl font-semibold">GOVERNMENT OF SINDH</p>
            <p className="text-base sm:text-lg">SINDH EDUCATION FOUNDATION</p>
            <p className="mt-4 text-sm sm:text-base bg-white/20 backdrop-blur-sm rounded-lg py-2 px-4 inline-block">
              Application Form for Students of Government and SEF Schools in Grade 6
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
                  <strong>Note:</strong> Enter student name as per NADRA B-Form in CAPITAL LETTERS only
                </p>
              </div>

              <InputField
                label="Student Name (As per NADRA B-Form)"
                name="studentName"
                placeholder="ENTER NAME IN CAPITAL LETTERS"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1.5">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-6 pt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        {...register('gender')}
                        value="Male"
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        {...register('gender')}
                        value="Female"
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Female</span>
                    </label>
                  </div>
                  {errors.gender && (
                    <span className="text-red-500 text-xs mt-1">{errors.gender.message}</span>
                  )}
                </div>

                <InputField
                  label="Student B-Form"
                  name="studentBForm"
                  placeholder="00000-0000000-0"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <input
                      type="number"
                      {...register('dobDay')}
                      placeholder="Day"
                      min="1"
                      max="31"
                      className={`px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.dobDay ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.dobDay && (
                      <span className="text-red-500 text-xs mt-1">{errors.dobDay.message}</span>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    <select
                      {...register('dobMonth')}
                      className={`px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.dobMonth ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    {errors.dobMonth && (
                      <span className="text-red-500 text-xs mt-1">{errors.dobMonth.message}</span>
                    )}
                  </div>
                  
                  <div className="flex flex-col">
                    <input
                      type="number"
                      {...register('dobYear')}
                      placeholder="Year"
                      min="2012"
                      max="2018"
                      className={`px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.dobYear ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    />
                    {errors.dobYear && (
                      <span className="text-red-500 text-xs mt-1">{errors.dobYear.message}</span>
                    )}
                  </div>
                </div>
              </div>

              <InputField
                label="Religion"
                name="religion"
                placeholder="Enter religion"
                required
              />
            </div>
          </div>

          {/* Section 2: Father/Guardian Information */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
              Father/Guardian Information
            </h2>
            
            <div className="grid grid-cols-1 gap-5">
              <InputField
                label="Father's Name"
                name="fatherName"
                placeholder="Enter father's name"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Father's CNIC"
                  name="fatherCNIC"
                  placeholder="00000-0000000-0"
                  required
                />

                <InputField
                  label="District of Domicile (Father)"
                  name="domicileDistrict"
                  placeholder="Enter district"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Guardian's Name"
                  name="guardianName"
                  placeholder="Enter guardian's name (if applicable)"
                />

                <InputField
                  label="Guardian's Contact"
                  name="guardianContact"
                  placeholder="03001234567"
                  type="tel"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Contact Number 1"
                  name="contact1"
                  placeholder="03001234567"
                  type="tel"
                  required
                />

                <InputField
                  label="Contact Number 2"
                  name="contact2"
                  placeholder="03001234567"
                  type="tel"
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
              <InputField
                label="Postal Address"
                name="postalAddress"
                placeholder="Enter complete postal address"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="City"
                  name="city"
                  placeholder="Enter city"
                  required
                />

                <InputField
                  label="District"
                  name="district"
                  placeholder="Enter district"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 4: Previous School Information */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
              Previous School Information
            </h2>
            
            <div className="grid grid-cols-1 gap-5">
              <InputField
                label="School Name"
                name="schoolName"
                placeholder="Enter school name"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-700 mb-1.5">
                    School Category <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        {...register('schoolCategory')}
                        value="Government School"
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Government School</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        {...register('schoolCategory')}
                        value="SEF School"
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">SEF School</span>
                    </label>
                  </div>
                  {errors.schoolCategory && (
                    <span className="text-red-500 text-xs mt-1">
                      {errors.schoolCategory.message}
                    </span>
                  )}
                </div>

                <InputField
                  label="School SEMIS/Code"
                  name="schoolSemisCode"
                  placeholder="Enter SEMIS/Code"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <InputField
                  label="Currently Studying in Class"
                  name="studyingInClass"
                  placeholder="e.g., Class 5"
                  required
                />

                <InputField
                  label="Year of Enrollment"
                  name="enrollmentYear"
                  type="number"
                  placeholder="2020"
                  required
                />

                <InputField
                  label="School GR No"
                  name="schoolGRNo"
                  placeholder="Enter GR number"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Headmaster/Headmistress Name"
                  name="headmasterName"
                  placeholder="Enter name"
                  required
                />

                <InputField
                  label="Headmaster Contact"
                  name="headmasterContact"
                  placeholder="03001234567"
                  type="tel"
                  required
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
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1.5">
                  Medium of Instructions for Entry Test <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      {...register('testMedium')}
                      value="Sindhi"
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Sindhi</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      {...register('testMedium')}
                      value="Urdu"
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Urdu</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      {...register('testMedium')}
                      value="English"
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">English</span>
                  </label>
                </div>
                {errors.testMedium && (
                  <span className="text-red-500 text-xs mt-1">{errors.testMedium.message}</span>
                )}
              </div>

              <InputField
                label="Division"
                name="division"
                placeholder="Enter division"
                required
              />
            </div>
          </div>

          {/* Entry Test Criteria Information */}
          <div className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Entry Test Criteria</h3>
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
            <h3 className="text-lg font-bold text-green-900 mb-4">Eligibility Criteria</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Must be currently studying in Grade V/Class 5 (bonafide) student of Government School or SEF School</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Must have studied in any Government School or SEF School for at least last three academic years including Grade 5</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Age should not exceed eleven years as on 13th April, 2023</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Must be a resident of the Karachi Division</span>
              </li>
            </ul>
          </div>

          {/* Documents Required */}
          <div className="mb-8 bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-bold text-orange-900 mb-4">Documents Required</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Duly filled Admission/Application Form along with 06 passport size recent photographs (with Blue background)</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Photocopy of General Register (GR) page duly attested by concerned Head Master/Head Mistress</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>School leaving Certificate / Pass Certificate will be required at the time of admission</span>
              </li>
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>Photocopies of Student's B-Form, Father's Domicile and Father's CNIC</span>
              </li>
            </ul>
          </div>

          {/* Acknowledgment */}
          <div className="mb-8">
            <label className="flex items-start cursor-pointer bg-gray-50 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <input
                type="checkbox"
                {...register('acknowledgment')}
                className="w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-500 mt-0.5 flex-shrink-0"
              />
              <span className="ml-3 text-sm text-gray-700">
                I hereby declare that all the information provided above is true and correct to the best of my knowledge. 
                I understand that admission will be subject to verification of documents and that SEF reserves the right to 
                reject the application at any stage in case of omission or misrepresentation. <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.acknowledgment && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.acknowledgment.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
            
            <button
              type="button"
              onClick={() => reset()}
              className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-lg shadow hover:shadow-lg hover:bg-gray-300 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Reset Form
            </button>
          </div>

          {/* Footer Information */}
          <div className="mt-8 text-center text-sm text-gray-600 space-y-1">
            <p>For further details and updates please visit:</p>
            <p className="font-semibold text-blue-600">www.psg.edu.pk | http://sef.org.pk</p>
            <p className="mt-4 text-xs text-gray-500">
              Public School Gadap, Karachi, 22 km of Super Highway Main Gadap, Road, Gadap Town, Karachi
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;
