import React, { useEffect, useState } from "react";
import { Form1 } from "./admission/form-1";
import { Form2 } from "./admission/form-2";
import { Form3 } from "./admission/form-3";
import { Form4 } from "./admission/form-4";
import { Form5 } from "./admission/form-5";
import FormFooter from "../footer/form-footer";

const AdmissionForm = () => {
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = localStorage.getItem("admissionStep");
    return savedStep ? Number(savedStep) : 1;
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("admissionFormData");
    return savedData ? JSON.parse(savedData) : {};
  });

  const totalSteps = 5;

  useEffect(() => {
    localStorage.setItem("admissionStep", currentStep);
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("admissionFormData", JSON.stringify(formData));
  }, [formData]);

  const handleNextStep = (stepData) => {
    // Merge current step data with existing form data
    setFormData((prevData) => ({
      ...prevData,
      ...stepData,
    }));

    console.log(`Step ${currentStep} Data:`, stepData);
    console.log("Accumulated Form Data:", { ...formData, ...stepData });

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalSubmit = (finalStepData) => {
    const completeFormData = { ...formData, ...finalStepData };

    console.log("Final Complete Form Data:", completeFormData);

    localStorage.removeItem("admissionStep");
    localStorage.removeItem("admissionFormData");

    alert("Form submitted successfully!");
  };

  const renderStep = () => {
    const commonProps = {
      onNext: handleNextStep,
      onPrevious: handlePreviousStep,
      initialData: formData,
      currentStep,
      totalSteps,
    };

    switch (currentStep) {
      case 1:
        return <Form1 {...commonProps} />;
      case 2:
        return <Form2 {...commonProps} />;
      case 3:
        return <Form3 {...commonProps} />;
      case 4:
        return <Form4 {...commonProps} />;
      case 5:
        return <Form5 {...commonProps} onFinalSubmit={handleFinalSubmit} />;
      default:
        return <Form1 {...commonProps} />;
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
              Grade 6 , 7 , 8 , 9
            </p>
            <p className="text-sm mt-2">Session 2026-27</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      step < currentStep
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
                    {step === 5 && "Test Preference"}
                  </p>
                </div>
                {step < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step < currentStep ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        {renderStep()}

        {/* Footer Information */}
        <FormFooter />
      </div>
    </div>
  );
};

export default AdmissionForm;
