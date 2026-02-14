import React, { useState } from 'react';
import Button from '../button';


const CandidatePDFDownloader = ({ data }) => {

  const [isPrinting, setIsPrinting] = useState(false);

  const imageUrl = data?.fileUrl || '';
  const hasImage = imageUrl && imageUrl.trim() !== '';

  const generatePDF = () => {
    setIsPrinting(true);

    const printWindow = document.createElement('iframe');
    printWindow.style.position = 'absolute';
    printWindow.style.width = '0';
    printWindow.style.height = '0';
    printWindow.style.border = 'none';

    document.body.appendChild(printWindow);

    const doc = printWindow.contentWindow.document;

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Candidate Registration Form</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @media print {
            body { 
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body class="bg-white p-8">
        <!-- Title -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-indigo-600 border-b-4 border-indigo-600 pb-3">
            CANDIDATE REGISTRATION FORM
          </h1>
        </div>
        
        <!-- Personal Information with Picture -->
        <div class="mb-6">
          <div class="bg-indigo-600 text-white font-bold text-lg px-4 py-2 mb-4">
            PERSONAL INFORMATION
          </div>
          <div class="flex px-4">
            <!-- Left side - Personal info -->
            <div class="flex-grow space-y-2">
              <div class="flex">
                <span class="font-semibold w-48">Candidate Name:</span>
                <span class="text-gray-700">${data.studentName || 'N/A'}</span>
              </div>
              <div class="flex">
                <span class="font-semibold w-48">Gender:</span>
                <span class="text-gray-700 capitalize">${data.gender || 'N/A'}</span>
              </div>
              <div class="flex">
                <span class="font-semibold w-48">B Form Number:</span>
                <span class="text-gray-700">${data.studentBForm || 'N/A'}</span>
              </div>
              <div class="flex">
                <span class="font-semibold w-48">Date of Birth:</span>
                <span class="text-gray-700">${data.dob || 'N/A'}</span>
              </div>
              <div class="flex">
                <span class="font-semibold w-48">Religion:</span>
                <span class="text-gray-700">${data.religion || 'N/A'}</span>
              </div>
            </div>
            
            <!-- Right side - Picture -->
            ${hasImage ? `
            <div class="flex-shrink-0 ml-8">
              <img src="${imageUrl}" alt="Candidate" class="w-32 h-32 object-contain border-4 border-indigo-600 rounded-lg shadow-lg" onerror="this.style.display='none'">
            </div>
          ` : ''}
          </div>
        </div>
        
        <!-- Guardian Information -->
        <div class="mb-6">
          <div class="bg-indigo-600 text-white font-bold text-lg px-4 py-2 mb-4">
            FATHER/GUARDIAN INFORMATION
          </div>
          <div class="space-y-2 px-4">
            <div class="flex">
              <span class="font-semibold w-48">Name:</span>
              <span class="text-gray-700">${data.guardianName || 'N/A'}</span>
            </div>
            <div class="flex">
              <span class="font-semibold w-48">CNIC:</span>
              <span class="text-gray-700">${data.guardianCNIC || 'N/A'}</span>
            </div>
            <div class="flex">
              <span class="font-semibold w-48">Relation:</span>
              <span class="text-gray-700">${data.relation || 'N/A'}</span>
            </div>
            <div class="flex">
              <span class="font-semibold w-48">District of Domicile:</span>
              <span class="text-gray-700">${data.guardianDomicileDistrict || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <!-- Priority Schools -->
        <div class="mb-6">
          <div class="bg-indigo-600 text-white font-bold text-lg px-4 py-2 mb-4">
            SCHOOL PRIORITY SELECTION
          </div>
          <div class="space-y-2 px-4">
            <div class="flex">
              <span class="font-semibold w-48">First Priority:</span>
              <span class="text-gray-700">${data.first_priority_school || 'N/A'}</span>
            </div>
            <div class="flex">
              <span class="font-semibold w-48">Second Priority:</span>
              <span class="text-gray-700">${data.second_priority_school || 'N/A'}</span>
            </div>
            <div class="flex">
              <span class="font-semibold w-48">Third Priority:</span>
              <span class="text-gray-700">${data.third_priority_school || 'N/A'}</span>
            </div>
          </div>
        </div>
        
      </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      printWindow.contentWindow.focus();
      printWindow.contentWindow.print();

      setTimeout(() => {
        document.body.removeChild(printWindow);
        setIsPrinting(false);
      }, 100);
    }, 500);
  };

  return (
    <Button
      onClick={generatePDF}
      className="px-8 py-3 bg-[#00A03C] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
    >
      Download PDF
    </Button>

  );
};


// const CandidatePDFDownloader = ({data}) => {

//     const [isPrinting, setIsPrinting] = useState(false);

//     const candidateData = {
//         candidateName: "Ahmed Ali Khan",
//         gender: "Male",
//         bForm: "42101-1234567-1",
//         dob: "2008-03-15",
//         religion: "Islam",
//         // Candidate Picture (Base64) - Replace this with your actual image
//         candidatePicture: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%234F46E5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='80' fill='white'%3EAA%3C/text%3E%3C/svg%3E",
//         guardianName: "Muhammad Ali Khan",
//         guardianCNIC: "42101-9876543-1",
//         relation: "Father",
//         domicileDistrict: "Karachi",
//         guardianProfession: "Business Owner",
//         annualIncome: "800000",
//         phoneNumber: "0321-1234567",
//         whatsappNumber: "0321-1234567",
//         postalAddress: "House No. 123, Block A, Gulshan-e-Iqbal, Karachi",
//         division: "Karachi",
//         district: "Karachi Central",
//         schoolName: "Karachi Grammar School",
//         schoolCategory: "Private",
//         schoolCode: "KHI-KGS-001",
//         currentClass: "9th",
//         enrollmentYear: "2020",
//         grNumber: "GR-2020-12345",
//         principalName: "Dr. Sarah Ahmed",
//         firstPrioritySchool: "Karachi Grammar School",
//         secondPrioritySchool: "Beaconhouse School System",
//         thirdPrioritySchool: "The City School"
//     };

//     const generatePDF = () => {
//         setIsPrinting(true);

//         const printWindow = document.createElement('iframe');
//         printWindow.style.position = 'absolute';
//         printWindow.style.width = '0';
//         printWindow.style.height = '0';
//         printWindow.style.border = 'none';

//         document.body.appendChild(printWindow);

//         const doc = printWindow.contentWindow.document;

//         doc.open();
//         doc.write(`
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <title>Candidate Registration Form</title>
//         <script src="https://cdn.tailwindcss.com"></script>
//         <style>
//           @media print {
//             body { 
//               -webkit-print-color-adjust: exact;
//               print-color-adjust: exact;
//             }
//           }
//         </style>
//       </head>
//       <body class="bg-white p-8">
//         <!-- Title -->
//         <div class="text-center mb-8">
//           <h1 class="text-3xl font-bold text-indigo-600 border-b-4 border-indigo-600 pb-3">
//             CANDIDATE REGISTRATION FORM
//           </h1>
//         </div>

//         <!-- Personal Information with Picture -->
//         <div class="mb-6">
//           <div class="bg-indigo-600 text-white font-bold text-lg px-4 py-2 mb-4">
//             PERSONAL INFORMATION
//           </div>
//           <div class="flex px-4">
//             <!-- Left side - Personal info -->
//             <div class="flex-grow space-y-2">
//               <div class="flex">
//                 <span class="font-semibold w-48">Candidate Name:</span>
//                 <span class="text-gray-700">${candidateData.candidateName}</span>
//               </div>
//               <div class="flex">
//                 <span class="font-semibold w-48">Gender:</span>
//                 <span class="text-gray-700">${candidateData.gender}</span>
//               </div>
//               <div class="flex">
//                 <span class="font-semibold w-48">B Form Number:</span>
//                 <span class="text-gray-700">${candidateData.bForm}</span>
//               </div>
//               <div class="flex">
//                 <span class="font-semibold w-48">Date of Birth:</span>
//                 <span class="text-gray-700">${candidateData.dob}</span>
//               </div>
//               <div class="flex">
//                 <span class="font-semibold w-48">Religion:</span>
//                 <span class="text-gray-700">${candidateData.religion}</span>
//               </div>
//             </div>

//             <!-- Right side - Picture -->
//             ${candidateData.candidatePicture ? `
//               <div class="flex-shrink-0 ml-8">
//                 <img src="${candidateData.candidatePicture}" alt="Candidate" class="w-32 h-32 object-cover border-4 border-indigo-600 rounded-lg shadow-lg">
//               </div>
//             ` : ''}
//           </div>
//         </div>

//         <!-- Guardian Information -->
//         <div class="mb-6">
//           <div class="bg-indigo-600 text-white font-bold text-lg px-4 py-2 mb-4">
//             FATHER/GUARDIAN INFORMATION
//           </div>
//           <div class="space-y-2 px-4">
//             <div class="flex">
//               <span class="font-semibold w-48">Name:</span>
//               <span class="text-gray-700">${candidateData.guardianName}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">CNIC:</span>
//               <span class="text-gray-700">${candidateData.guardianCNIC}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">Relation:</span>
//               <span class="text-gray-700">${candidateData.relation}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">District of Domicile:</span>
//               <span class="text-gray-700">${candidateData.domicileDistrict}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">Profession:</span>
//               <span class="text-gray-700">${candidateData.guardianProfession}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">Annual Income:</span>
//               <span class="text-gray-700">Rs. ${candidateData.annualIncome}</span>
//             </div>
//           </div>
//         </div>

//         <!-- Contact Information -->
//         <div class="mb-6">
//           <div class="bg-indigo-600 text-white font-bold text-lg px-4 py-2 mb-4">
//             CONTACT INFORMATION
//           </div>
//           <div class="space-y-2 px-4">
//             <div class="flex">
//               <span class="font-semibold w-48">Phone Number:</span>
//               <span class="text-gray-700">${candidateData.phoneNumber}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">WhatsApp Number:</span>
//               <span class="text-gray-700">${candidateData.whatsappNumber}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">Postal Address:</span>
//               <span class="text-gray-700">${candidateData.postalAddress}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">Division:</span>
//               <span class="text-gray-700">${candidateData.division}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">District:</span>
//               <span class="text-gray-700">${candidateData.district}</span>
//             </div>
//           </div>
//         </div>

//         <!-- School Information -->
//         <div class="mb-6">
//           <div class="bg-indigo-600 text-white font-bold text-lg px-4 py-2 mb-4">
//             CURRENT SCHOOL INFORMATION
//           </div>
//           <div class="space-y-2 px-4">
//             <div class="flex">
//               <span class="font-semibold w-48">School Name:</span>
//               <span class="text-gray-700">${candidateData.schoolName}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">School Category:</span>
//               <span class="text-gray-700">${candidateData.schoolCategory}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">School SEMIS/Code:</span>
//               <span class="text-gray-700">${candidateData.schoolCode}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">Current Class:</span>
//               <span class="text-gray-700">${candidateData.currentClass}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">Year of Enrollment:</span>
//               <span class="text-gray-700">${candidateData.enrollmentYear}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">School GR Number:</span>
//               <span class="text-gray-700">${candidateData.grNumber}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">Principal Name:</span>
//               <span class="text-gray-700">${candidateData.principalName}</span>
//             </div>
//           </div>
//         </div>

//         <!-- Priority Schools -->
//         <div class="mb-6">
//           <div class="bg-indigo-600 text-white font-bold text-lg px-4 py-2 mb-4">
//             SCHOOL PRIORITY SELECTION
//           </div>
//           <div class="space-y-2 px-4">
//             <div class="flex">
//               <span class="font-semibold w-48">First Priority:</span>
//               <span class="text-gray-700">${candidateData.firstPrioritySchool}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">Second Priority:</span>
//               <span class="text-gray-700">${candidateData.secondPrioritySchool}</span>
//             </div>
//             <div class="flex">
//               <span class="font-semibold w-48">Third Priority:</span>
//               <span class="text-gray-700">${candidateData.thirdPrioritySchool}</span>
//             </div>
//           </div>
//         </div>

//         <!-- Footer -->
//         <div class="border-t-2 border-gray-300 mt-8 pt-4 text-center text-sm text-gray-500">
//           Generated on: ${new Date().toLocaleString()}
//         </div>
//       </body>
//       </html>
//     `);
//         doc.close();

//         setTimeout(() => {
//             printWindow.contentWindow.focus();
//             printWindow.contentWindow.print();

//             setTimeout(() => {
//                 document.body.removeChild(printWindow);
//                 setIsPrinting(false);
//             }, 100);
//         }, 500);
//     };

//     return (
//         <Button
//             onClick={generatePDF}
//             className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
//         >
//             Download PDF
//         </Button>

//     );
// };

export default CandidatePDFDownloader;

