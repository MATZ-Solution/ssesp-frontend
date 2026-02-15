import React, { useState } from "react";
import jsPDF from "jspdf";
import Button from "../button";

const CandidatePDFDownloader = ({ data }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async () => {
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF("p", "mm", "a4");
      let y = 20;

      /* ========================= */
      /* Title                     */
      /* ========================= */
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 160, 60); // #00A03C
      doc.text("CANDIDATE REGISTRATION FORM", 105, y, {
        align: "center",
      });
      y += 8;
      
      // Title underline
      doc.setDrawColor(0, 160, 60);
      doc.setLineWidth(1);
      doc.line(20, y, 190, y);
      y += 15;

      /* ========================= */
      /* Section Title Helper      */
      /* ========================= */
      const addSectionTitle = (title) => {
        doc.setFontSize(13);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(0, 160, 60); // #00A03C
        doc.rect(20, y - 6, 170, 9, "F");
        doc.text(title, 25, y);
        y += 10;
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
      };

      /* ========================= */
      /* Row Helper                */
      /* ========================= */
      const addRow = (label, value, capitalize = false) => {
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text(`${label}:`, 25, y);
        doc.setFont(undefined, 'normal');
        
        // Capitalize if needed
        let displayValue = String(value || "N/A");
        if (capitalize && value) {
          displayValue = displayValue.charAt(0).toUpperCase() + displayValue.slice(1).toLowerCase();
        }
        
        doc.text(displayValue, 80, y);
        y += 6;
      };

      /* ========================= */
      /* Format Date Helper        */
      /* ========================= */
      const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        
        try {
          const date = new Date(dateString);
          
          // Get day, month, year
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
          const year = date.getFullYear();
          
          // Return in DD/MM/YYYY format
          return `${day}/${month}/${year}`;
        } catch (error) {
          return "N/A";
        }
      };

      /* ========================= */
      /* PERSONAL INFORMATION      */
      /* ========================= */
      addSectionTitle("PERSONAL INFORMATION");
      const imageStartY = y - 2;
      
      addRow("Candidate Name", data?.studentName, true); // Capitalize
      addRow("Gender", data?.gender, true); // Capitalize
      addRow("B Form Number", data?.studentBForm);
      addRow("Date of Birth", formatDate(data?.dob)); // Format date
      addRow("Religion", data?.religion, true); // Capitalize

      /* ========================= */
      /* Add Image - AUTO DETECT   */
      /* ========================= */
      if (data?.fileUrl) {
        try {
          const imageData = await getBase64FromUrl(data.fileUrl);
          const imageFormat = getImageFormat(imageData);
          
          const imgSize = 40;
          const imgX = 147;
          const imgY = imageStartY;
          
          doc.addImage(
            imageData,
            imageFormat,
            imgX,
            imgY,
            imgSize,
            imgSize
          );
          
          doc.setDrawColor(0, 160, 60);
          doc.setLineWidth(1);
          doc.rect(imgX, imgY, imgSize, imgSize);
          
        } catch (err) {
          console.log("Image load failed:", err);
        }
      }

      y += 20;

      /* ========================= */
      /* GUARDIAN INFO             */
      /* ========================= */
      addSectionTitle("FATHER / GUARDIAN INFORMATION");
      addRow("Name", data?.guardianName, true); // Capitalize
      addRow("CNIC", data?.guardianCNIC);
      addRow("Relation", data?.relation, true); // Capitalize
      addRow("District of Domicile", data?.guardianDomicileDistrict, true); // Capitalize
      
      y += 8;

      /* ========================= */
      /* SCHOOL PRIORITY           */
      /* ========================= */
      addSectionTitle("SCHOOL PRIORITY SELECTION");
      addRow("First Priority", data?.first_priority_school, true); // Capitalize
      addRow("Second Priority", data?.second_priority_school, true); // Capitalize
      addRow("Third Priority", data?.third_priority_school, true); // Capitalize

      y += 12;

      /* ========================= */
      /* FOOTER                    */
      /* ========================= */
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      doc.line(20, y, 190, y);
      y += 6;
      
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.setFont(undefined, 'italic');
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, y, {
        align: "center",
      });

      /* ========================= */
      /* SAVE PDF                  */
      /* ========================= */
      doc.save(`${data?.studentName || 'Candidate'}_Registration_Form.pdf`);

    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  /* ================================================ */
  /* AUTO-DETECT IMAGE FORMAT FROM BASE64             */
  /* ================================================ */
  const getImageFormat = (base64String) => {
    if (!base64String) return 'JPEG';
    
    if (base64String.startsWith('data:image/jpeg') || base64String.startsWith('data:image/jpg')) {
      return 'JPEG';
    } else if (base64String.startsWith('data:image/png')) {
      return 'PNG';
    } else if (base64String.startsWith('data:image/gif')) {
      return 'GIF';
    } else if (base64String.startsWith('data:image/webp')) {
      return 'WEBP';
    } else if (base64String.startsWith('data:image/bmp')) {
      return 'BMP';
    } else {
      return 'JPEG';
    }
  };

  /* ================================================ */
  /* Convert Image URL to Base64                      */
  /* ================================================ */
  const getBase64FromUrl = async (url) => {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <Button
      onClick={downloadPDF}
      disabled={isGenerating}
      className="px-8 py-3 bg-[#00A03C] hover:bg-[#028d37] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
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
          Generating PDF...
        </span>
      ) : (
        'Download PDF'
      )}
    </Button>
  );
};

export default CandidatePDFDownloader;