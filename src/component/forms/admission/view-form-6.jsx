import React from "react";
import Button from "../../button";

const getOrdinal = (n) =>
  n === 1 ? "1st" : n === 2 ? "2nd" : n === 3 ? "3rd" : `${n}th`;

export const Form6View = ({ data = [], handleTitle }) => {
  const priorities = data?.priority || [];

  return (
    <div className="bg-white px-4 sm:px-6 md:px-8 lg:px-10 w-full">
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-4 sm:gap-5">

          {/* Header Banner */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
            <p className="text-xs sm:text-sm text-blue-800 font-medium">
              School Preferences — View Only
            </p>
          </div>

          {/* Priority Fields */}
          {priorities.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              No school preferences available.
            </p>
          ) : (
            <div className="flex flex-col gap-4 sm:gap-5">
              {priorities.map((item, index) => {
                const ordinal = getOrdinal(index + 1);
                return (
                  <div key={index}>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      {ordinal} Priority School
                    </p>
                    <p className="text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 break-words">
                      {item.schoolName || "—"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* Next Button */}
      <div className="flex py-4">
        <Button
          onClick={() => handleTitle && handleTitle("Confirmation")}
          type="button"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Next Step →
        </Button>
      </div>
    </div>
  );
};

export default Form6View;