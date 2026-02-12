import React from "react";
import { useLocation } from "react-router-dom";

const stepsList = [
  "student-info-1",
  "guardian-info-2",
  "address-3",
  "school-info-4",
  "document-upload-5",
  "test-preference-6",
];

function Steps() {

  const location = useLocation();
  const pathName = location.pathname;

  const pathArr = pathName.split("/").filter(Boolean);
  const currentSlug = pathArr[pathArr.length - 1];
  const currentStep = stepsList.indexOf(currentSlug) + 1;
  // console.log("currentStep: ", currentStep)

  return (
    <div className="bg-white px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${step < currentStep
                  ? "bg-green-500 text-white"
                  : step === currentStep
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600"
                  }`}
              >
                {step < currentStep ? "✓" : step}
              </div>

              <p className="text-xs mt-1 text-gray-600 hidden sm:block">
                {step === 1 && "Student Info"}
                {step === 2 && "Guardian Info"}
                {step === 3 && "Address"}
                {step === 4 && "School Info"}
                {step === 5 && "Document Upload"}
                {step === 6 && "Test Preference"}
              </p>
            </div>

            {step < 6 && (
              <div
                className={`flex-1 h-1 mx-2 ${step < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <h2 className="mt-5 text-xl sm:text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-500">
        Step {currentStep} of 5: Address Information
      </h2>
    </div>
  );
}

export default Steps;
