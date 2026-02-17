import React, { useState } from "react";
import jsPDF from "jspdf";
import Button from "../button";

const CandidatePDFDownloader = ({ data, previous_school, priority_school }) => {
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
      doc.text("SINDH EDUCATION FOUNDATION", 105, y, {
        align: "center",
      });

      y += 8;

      doc.setFontSize(14);
      doc.text("GOVERNMENT OF SINDH", 105, y, {
        align: "center",
      });

      y += 8;

      doc.setFontSize(12);
      doc.text("SINDH SCHOOL SCHOLARSHIP PROGRAM", 105, y, {
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


      y += 10;

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
      /* STUDENT ADDRESS INFORMATION          */
      /* ========================= */
      addSectionTitle("STUDENT ADDRESS INFORMATION");
      addRow("Postal Address", data?.postalAddress);
      addRow("Division", data?.division, true); // Capitalize
      addRow("District", data?.district, true); // Capitalize

      y += 8;

      /* ========================= */
      /* GUARDIAN INFO             */
      /* ========================= */
      addSectionTitle("FATHER / GUARDIAN INFORMATION");
      addRow("Guardian Name", data?.guardianName, true); // Capitalize
      addRow("Guardian CNIC", data?.guardianCNIC);
      // addRow("Guardian Annual Income", data?.guardianannualIncome);
      addRow("Relation", data?.relation, true); // Capitalize
      addRow("District of Domicile", data?.guardianDomicileDistrict, true); // Capitalize

      y += 8;

      /* ========================= */
      /* STUDENT ACADEMIC INFORMATION             */
      /* ========================= */
      addSectionTitle("STUDENT ACADEMIC INFORMATION");
      addRow("School Name", data?.schoolName);
      addRow("School Category", data?.schoolCategory);
      addRow("School Semis Code", data?.schoolSemisCode, true); // Capitalize
      addRow("Currently Studying In Class", data?.studyingInClass, true); // Capitalize
      addRow("Enrollment Year", data?.enrollmentYear, true); // Capitalize
      addRow("School GR.No", data?.schoolGRNo, true); // Capitalize

      y += 8;

      if (previous_school && previous_school.length > 0) {
        // Check if we need a new page for the table
        if (y > 200) { // If not enough space, start on new page
          doc.addPage();
          y = 20;
        }

        // Add some spacing before the table
        y += 10;

        addSectionTitle("PREVIOUS SCHOOLS INFORMATION");

        // Table configuration
        const tableStartY = y;
        const tableMargin = 20;
        const pageWidth = 210;
        const availableWidth = pageWidth - (tableMargin * 2);
        const columnWidths = [20, 50, 30, 40, 30];
        const rowHeight = 20;

        // Table headers
        const headers = ["Class", "School Category", "SEMIS Code", "District", "Year"];

        // Draw header row with background
        doc.setFillColor(0, 160, 60);
        doc.rect(tableMargin, y, availableWidth, rowHeight, 'F');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);

        let xPos = tableMargin;
        headers.forEach((header, index) => {
          doc.text(header, xPos + 2, y + 12, { maxWidth: columnWidths[index] - 4 });
          xPos += columnWidths[index];
        });

        y += rowHeight;

        // Draw horizontal line after header
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.3);
        doc.line(tableMargin, y, tableMargin + availableWidth, y);

        // Draw table rows
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);

        previous_school.forEach((school, rowIndex) => {
          // Check if we need a new page BEFORE drawing the row
          if (y + rowHeight > 280) { // Leave margin at bottom
            doc.addPage();
            y = 20;

            // Redraw header on new page
            doc.setFillColor(0, 160, 60);
            doc.rect(tableMargin, y, availableWidth, rowHeight, 'F');
            doc.setFont("helvetica", "bold");
            doc.setTextColor(255, 255, 255);

            xPos = tableMargin;
            headers.forEach((header, index) => {
              doc.text(header, xPos + 2, y + 12, { maxWidth: columnWidths[index] - 4 });
              xPos += columnWidths[index];
            });

            y += rowHeight;
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
          }

          // Alternate row colors
          if (rowIndex % 2 === 0) {
            doc.setFillColor(245, 245, 245);
            doc.rect(tableMargin, y, availableWidth, rowHeight, 'F');
          }

          xPos = tableMargin;
          const rowData = [
            school.class,
            school.schoolCategory,
            school.semisCode,
            school.district,
            school.yearOfPassing
          ];

          rowData.forEach((cellData, colIndex) => {
            const text = String(cellData || '-');
            doc.text(text, xPos + 2, y + 12, { maxWidth: columnWidths[colIndex] - 4 });
            xPos += columnWidths[colIndex];
          });

          // Draw horizontal line after each row
          y += rowHeight;
          doc.line(tableMargin, y, tableMargin + availableWidth, y);
        });

        // Draw outer border and vertical lines
        const tableHeight = (previous_school.length + 1) * rowHeight;

        // Left border
        doc.line(tableMargin, tableStartY, tableMargin, tableStartY + tableHeight);

        // Right border
        doc.line(tableMargin + availableWidth, tableStartY, tableMargin + availableWidth, tableStartY + tableHeight);

        // Top border
        doc.line(tableMargin, tableStartY, tableMargin + availableWidth, tableStartY);

        // Vertical lines between columns
        xPos = tableMargin;
        for (let i = 0; i < columnWidths.length - 1; i++) {
          xPos += columnWidths[i];
          doc.line(xPos, tableStartY, xPos, tableStartY + tableHeight);
        }

        // Add spacing after table
      }

      y += 20;

      /* ========================= */
      /* SCHOOL PRIORITY           */
      /* ========================= */
      addSectionTitle("SCHOOL PRIORITY SELECTION");

      if (priority_school && priority_school?.length > 0) {
        priority_school?.forEach((item, index) => {
          const priorityNumber = index + 1;
          const ordinal = priorityNumber === 1 ? "First" :
            priorityNumber === 2 ? "Second" :
              priorityNumber === 3 ? "Third" :
                priorityNumber === 4 ? "Fourth" :
                  `${priorityNumber}th`;
          addRow(`${ordinal} Priority`, item.schoolName, true);
        });
      } else {
        addRow("No Priority", "No school priorities selected", false);
      }
      // addRow("First Priority", data?.first_priority_school, true); // Capitalize
      // addRow("Second Priority", data?.second_priority_school, true); // Capitalize
      // addRow("Third Priority", data?.third_priority_school, true); // Capitalize

      y += 12;

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