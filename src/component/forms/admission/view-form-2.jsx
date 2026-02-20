import React from "react";
import Button from "../../button";

const Field = ({ label, value }) => (
    <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {label}
        </p>
        <p className="text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-4 py-2.5 break-words">
            {value || "—"}
        </p>
    </div>
);

export const Form2View = ({ data = {}, handleTitle }) => {
    return (
        <div className="bg-white shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 w-full">
            <div className="flex flex-col gap-4 sm:gap-5">

                {/* Header Banner */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 rounded-r-lg">
                    <p className="text-xs sm:text-sm text-blue-800 font-medium">
                        Father / Guardian Information — View Only
                    </p>
                </div>

                {/* Guardian Name — full width */}
                <Field
                    label="Name (Father/Guardian)"
                    value={data.guardianName}
                />

                {/* Row: CNIC + District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <Field
                        label="CNIC (Father/Guardian)"
                        value={data.guardianCNIC}
                    />
                    <Field
                        label="District of Domicile (Father/Guardian)"
                        value={data.guardianDomicileDistrict}
                    />
                </div>

                {/* Row: Profession + Annual Income */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <Field
                        label="Profession (Father/Guardian)"
                        value={data.guardianProfession}
                    />
                    <Field
                        label="Annual Income (Father/Guardian)"
                        value={
                            data.guardianannualIncome
                                ? `PKR ${Number(data.guardianannualIncome).toLocaleString()}`
                                : "—"
                        }
                    />
                </div>

                {/* Row: Relation + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <Field
                        label="Relation (Guardian)"
                        value={data.relation}
                    />
                    <Field
                        label="Phone Number"
                        value={data.guardianContactNumber}
                    />
                </div>

                {/* Row: WhatsApp (half width to match original form layout) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <Field
                        label="WhatsApp Number"
                        value={data.guardianContactWhattsappNumber}
                    />
                </div>

                {/* SEF Siblings */}
                <Field
                    label="Siblings Under SEF Scholarship"
                    value={
                        data.siblings_under_sef === "yes"
                            ? "Yes"
                            : data.siblings_under_sef === "no"
                                ? "No"
                                : "—"
                    }
                />

                {/* Conditional: Number of siblings — only shown if "yes" */}
                {data.siblings_under_sef === "yes" && (
                    <Field
                        label="Number of Siblings Under SEF"
                        value={data.no_siblings_under_sef ? String(data.no_siblings_under_sef) : "—"}
                    />
                )}

            </div>
            <div className="mt-4 flex items-center justify-between py-4">
                <Button
                    onClick={() => handleTitle("Student Information")}
                    type="button"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    Previous Step →
                </Button>
                <Button
                    onClick={() => handleTitle("Address Information")}
                    type="button"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                    Next Step →
                </Button>
            </div>
        </div>
    );
};