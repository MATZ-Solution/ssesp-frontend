import React from 'react';
import FormFooter from '../footer/form-footer';
import FormHeader from '../header/form-header';
import Steps from '../steps';
import Navbar from '../Navbar';

function FormTemplate({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 x">
      <div className="max-w-5xl mx-auto">
        <Navbar/>
        <FormHeader />
        <Steps />
        {children}
        <FormFooter />
      </div>
    </div>
  )
}

export default FormTemplate