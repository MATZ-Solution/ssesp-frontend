import React from 'react';

function FormFooter() {
  return (
    <div className="bg-white rounded-b-2xl shadow-lg p-6 text-center text-sm text-gray-600 space-y-1">
      <p>For further details and updates please visit:</p>
      <p className="font-semibold text-blue-600">
        <a href="https://www.sef.org.pk" target="_blank" rel="noopener noreferrer">
          https://www.sef.org.pk
        </a>{" "}
        |{" "}
        <a href="http://sef.org.pk/ssesp/apply" target="_blank" rel="noopener noreferrer">
          http://sef.org.pk/ssesp/apply
        </a>
      </p>
    
    </div>
  );
}

export default FormFooter;
