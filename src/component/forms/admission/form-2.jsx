import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { ControlledInputField } from '../../input-field';
import { step2Schema } from "../../schema/admission-form-schema";
import FormTemplate from "../../template/form-template";
import { useNavigate } from "react-router-dom";
import { useAddApplicantGuardianInfo, useGetApplicantGuardianInfo } from "../../../../api/client/applicant";
import ProtectedRouteForm from "../../../../utils/protected-route-form";
import Button from "../../button";

export const Form2 = () => {

  const navigate = useNavigate()
  const { addApplicantGuardian, isSuccess, isPending, isError, error } = useAddApplicantGuardianInfo()
  const { data, isLoading } = useGetApplicantGuardianInfo()
  console.log("data: ", data)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step2Schema),
    defaultValues: {
      fatherName: "",
      fatherCNIC: "",
      domicileDistrict: "",
      guardianName: "",
      guardianContact: "",
      contact1: "",
      contact2: "",
    },
  });

  const onSubmit = (data) => {
    console.log('Step 2 - Father/Guardian Information:', data);
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

        {/* Navigation Buttons */}
        <div className="flex justify-between">

          <button
            type="button"
            onClick={() => navigate('/form/student-info')}
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