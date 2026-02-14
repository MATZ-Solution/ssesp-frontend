import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import FormTemplate from "../../template/form-template";
import { documentUploadSchema } from "../../schema/admission-form-schema";
import { useAddApplicantDocument } from "../../../../api/client/applicant";

const DocumentUploadItem = ({
    name,
    label,
    control,
    errors,
    preview,
    setPreview,
    description
}) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
                {label} <span className="text-red-500">*</span>
            </label>

            {description && (
                <p className="text-xs text-gray-600 mb-3">{description}</p>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                    <div className="space-y-3">
                        <div className="flex items-center justify-center w-full">
                            <label
                                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all ${errors[name]
                                    ? "border-red-500 bg-red-50 hover:bg-red-100"
                                    : preview
                                        ? "border-green-500 bg-green-50 hover:bg-green-100"
                                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                                    }`}
                            >
                                <div className="flex flex-col items-center justify-center p-4 w-full h-full">
                                    {preview ? (
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            {preview.type === 'pdf' ? (
                                                <div className="flex flex-col items-center justify-center">
                                                    <svg
                                                        className="w-16 h-16 text-red-500 mb-2"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <p className="text-sm font-medium text-gray-700 text-center">
                                                        {preview.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">PDF Document</p>
                                                </div>
                                            ) : (
                                                <img
                                                    src={preview.url}
                                                    alt={`${label} preview`}
                                                    className="max-w-full max-h-full object-contain rounded-lg shadow-md cursor-pointer"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowModal(true);
                                                    }}
                                                />
                                            )}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setPreview(null);
                                                    onChange(null);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <svg
                                                className="w-12 h-12 mb-3 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-center text-gray-500">
                                                <span className="font-semibold">Click to upload</span>
                                            </p>
                                            <p className="text-xs text-gray-500 text-center">
                                                PDF, JPG, JPEG, PNG
                                            </p>
                                            <p className="text-xs text-gray-500 text-center">
                                                (MAX. 5MB)
                                            </p>
                                        </>
                                    )}
                                </div>
                                <input
                                    {...field}
                                    type="file"
                                    accept="application/pdf,image/jpeg,image/jpg,image/png"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            if (file.size > 5 * 1024 * 1024) {
                                                alert("File size must not exceed 5MB");
                                                return;
                                            }

                                            if (
                                                ![
                                                    "application/pdf",
                                                    "image/jpeg",
                                                    "image/jpg",
                                                    "image/png",
                                                ].includes(file.type)
                                            ) {
                                                alert("Only PDF, JPG, JPEG, and PNG files are allowed");
                                                return;
                                            }

                                            if (file.type === "application/pdf") {
                                                setPreview({ type: 'pdf', name: file.name });
                                            } else {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setPreview({ type: 'image', url: reader.result, name: file.name });
                                                };
                                                reader.readAsDataURL(file);
                                            }

                                            onChange(file);
                                        }
                                    }}
                                />
                            </label>
                        </div>

                        {preview && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                                <p className="text-xs text-green-700 flex items-center">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Document uploaded
                                </p>
                            </div>
                        )}
                    </div>
                )}
            />
            {errors[name] && (
                <span className="text-red-500 text-xs mt-1 block">
                    {errors[name].message}
                </span>
            )}

            {/* Image Modal */}
            {showModal && preview && preview.type === 'image' && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowModal(false)}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 shadow-lg z-10"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <img
                            src={preview.url}
                            alt={`${label} enlarged`}
                            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const Form5 = ({ initialData = {} }) => {
    const [doc1Preview, setDoc1Preview] = useState(null);
    const [doc2Preview, setDoc2Preview] = useState(null);
    const [doc3Preview, setDoc3Preview] = useState(null);
    const [doc4Preview, setDoc4Preview] = useState(null);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(documentUploadSchema),
        defaultValues: {
            document1: initialData.document1 || null,
            document2: initialData.document2 || null,
            document3: initialData.document3 || null,
            document4: initialData.document4 || null,
        },
    });

    useEffect(() => {
        if (initialData.doc1Preview) setDoc1Preview(initialData.doc1Preview);
        if (initialData.doc2Preview) setDoc2Preview(initialData.doc2Preview);
        if (initialData.doc3Preview) setDoc3Preview(initialData.doc3Preview);
        if (initialData.doc4Preview) setDoc4Preview(initialData.doc4Preview);
    }, [initialData]);

    const { addDocument, isSuccess, isPending, isError, error } = useAddApplicantDocument()

    const onSubmit = (data) => {
        const documentsArray = [
            { name: "Birth Certificate", file: data.document1 },
            { name: "Guardian Doimicile", file: data.document2 },
            { name: "Guardian CNIC", file: data.document3 },
            { name: "Guardian PRC", file: data.document4 }
        ];

        const formData = new FormData()
        documentsArray.forEach((item, index) => {
            formData.append(item.name, item.file);
        })
        // Your submission logic here
        addDocument(formData);
    };

    const documents = [
        {
            name: "document1",
            label: "Birth Certificate (B-Form)",
            description: "Upload student's NADRA B-Form or Birth Certificate",
            preview: doc1Preview,
            setPreview: setDoc1Preview,
        },
        {
            name: "document2",
            label: "Parent/Guardian Doimicile",
            description: "Upload copy of parent or guardian's Domicile",
            preview: doc2Preview,
            setPreview: setDoc2Preview,
        },
        {
            name: "document3",
            label: "Parent/Guardian CNIC",
            description: "Upload copy of parent or guardian's CNIC",
            preview: doc3Preview,
            setPreview: setDoc3Preview,
        },
        {
            name: "document4",
            label: "Parent/Guardian PRC",
            description: "Upload copy of parent or guardian's PRC",
            preview: doc4Preview,
            setPreview: setDoc4Preview,
        },
    ];

    return (
        <FormTemplate>
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white shadow-xl rounded-lg p-6 sm:p-8 lg:p-10"
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Document Upload
                            </h2>
                            <p className="text-sm text-gray-600">
                                Please upload all required documents in PDF, JPG, JPEG, or PNG format
                            </p>
                        </div>

                        <div className="mb-8">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                                <p className="text-sm text-blue-800">
                                    <strong>Important:</strong> All documents must be clear, legible, and not exceed 5MB in size
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {documents.map((doc) => (
                                    <DocumentUploadItem
                                        key={doc.name}
                                        name={doc.name}
                                        label={doc.label}
                                        description={doc.description}
                                        control={control}
                                        errors={errors}
                                        preview={doc.preview}
                                        setPreview={doc.setPreview}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between border-t pt-6">
                            <button
                                onClick={() => navigate("/form/school-info-4")}
                                type="button"
                                className="px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg shadow hover:bg-gray-300 transition-all duration-200"
                            >
                                ← Previous Step
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Submit Documents →
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </FormTemplate>
    );
};

export default Form5;