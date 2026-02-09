import React from 'react';
import FormFooter from '../footer/form-footer';
import FormHeader from '../header/form-header';
import Steps from '../steps';

function FormTemplate({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <FormHeader />
        <Steps />
       
        {children}
        <FormFooter />
      </div>
    </div>
  )
}

export default FormTemplate