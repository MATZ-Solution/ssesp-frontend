import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ControlledInputField } from "../../input-field";
import { testMediumOptions } from "../../../../data/form-data";
import { ControlledRadioGroup } from "../../Radio-button";
// import { step5Schema } from "../../schema/admission-form-schema";
import FormTemplate from "../../template/form-template";
import { useNavigate } from "react-router-dom";
import { useAddApplicantTestPreference, useGetApplicantTestPreference } from "../../../../api/client/applicant";
import Button from "../../button";
import { divisionData } from "../../../../data/schools_grouped_by_division_updated_gender";

export const Form6 = () => {

  let [school, setSchool] = useState()
  const { addTestPreference, isSuccess, isPending, isError, error } = useAddApplicantTestPreference()
  const { data, isLoading } = useGetApplicantTestPreference()

  const navigate = useNavigate()
  // const {
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(step5Schema),
  //   defaultValues: {
  //     testMedium: "",
  //     division: "",
  //     acknowledgment: false,
  //   },
  // });

  const onSubmit = async (data) => {
    console.log("Step 5 - Entry Test Preference:", data);
    // addTestPreference(data)
  };

  useEffect(() => {

    // const division = divisionData?.find(
    //   item => item.division === data?.[0]?.division
    // );

    const district = divisionData
      .flatMap(division => division.districts)
      .find(district => district.district === data?.[0]?.domicileDistrict);


    const schoolData = district?.schools?.filter(
      item => item.gender === data?.[0]?.gender
    );

    const schools = schoolData?.map(item => ({ value: item.school_name, lable: item.school_name })) || [];
    setSchool(schools)

  }, [data]);

  console.log("school: ", school)


  return (
    <FormTemplate>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl p-6 sm:p-8 lg:p-10"
      >
        {/* <div className="mb-8">
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
        </div> */}

        {/* Important Information Sections */}
        <div className="space-y-6 mb-8">
          {/* Entry Test Criteria */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
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
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
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
                  at least last three academic years including Grade 5 , 6 , 7 ,
                  8 , 9
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
          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-lg">
            <h3 className="text-lg font-bold text-orange-900 mb-4">
              Documents Required
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-orange-600 mr-2">•</span>
                <span>
                  Duly filled Admission/Application Form along with 1 passport
                  size recent photographs (with Blue background)
                </span>
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
        </div>

        <div className="mb-6">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              {...control.register("acknowledgment")}
              className="mt-1 h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="text-sm text-gray-700">
              I hereby confirm that all the information provided above is true
              and correct to the best of my knowledge. I understand that any
              false information may result in rejection of the application.
            </span>
          </label>

          {errors.acknowledgment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.acknowledgment.message}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/form/school-info')}
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

export default Form6
