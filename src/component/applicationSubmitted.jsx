import React, { useState } from 'react';
import Navbar from './Navbar';
import CandidatePDFDownloader from './template/pdf-template';
import { useGetApplicantPDFinfo, useGetIsApplicantVerified } from '../../api/client/applicant';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StatusTracker from './test';

const ApplicationSubmitted = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)

    const { data, previous_school, priority_school, isSuccess, isError, isLoading } = useGetApplicantPDFinfo();
    const { message, status, editDocument, isError: applicantIsErr, applicantIsLoading } = useGetIsApplicantVerified();

    // console.log("message: ", message)
    // console.log("status: ", status)
    // console.log("editDocument: ", editDocument)

    const handleChangeDocument = () => {
        if (editDocument) {
            navigate(`/form/edit-document?applicantID=${user?.id}`)
        }
    }

    const [activeTab, setActiveTab] = useState('status');

    const tabs = [
        {
            id: 'status',
            label: 'Application Status',
            shortLabel: 'Status',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            id: 'download',
            label: 'Download PDF',
            shortLabel: 'Download',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            ),
        },
    ];

    return (
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <Navbar />

            {editDocument && (
                <button onClick={handleChangeDocument}>
                    Edit Document
                </button>
            )}

            {/* ── Mobile Tab Bar (visible on small screens) ── */}
            <div className="mt-6 flex sm:hidden bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="w-full">
                    <div className="h-1.5 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500" />
                    <div className="flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex flex-col items-center gap-1.5 py-4 text-xs font-semibold transition-all duration-200
                                    ${activeTab === tab.id
                                        ? 'text-green-700 border-b-2 border-green-500 bg-green-50'
                                        : 'text-gray-500 border-b-2 border-transparent'
                                    }`}
                            >
                                <span className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-green-100' : 'bg-gray-100'}`}>
                                    {tab.icon}
                                </span>
                                {tab.shortLabel}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Desktop Layout ── */}
            <div className="mt-6 flex flex-col sm:flex-row gap-6">

                {/* Sidebar — hidden on mobile */}
                <div className="hidden sm:block w-full sm:w-56 lg:w-64 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-6">
                        <div className="h-2 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500" />
                        <div className="p-4">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-2">
                                My Application
                            </p>
                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                                            ${activeTab === tab.id
                                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 shadow-sm border border-green-100'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                                            ${activeTab === tab.id
                                                ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                                                : 'bg-gray-100'
                                            }`}
                                        >
                                            <span className={activeTab === tab.id ? 'text-white' : 'text-gray-500'}>
                                                {tab.icon}
                                            </span>
                                        </div>
                                        <span className="truncate">{tab.label}</span>
                                        {activeTab === tab.id && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* ── Main Content ── */}
                <div className="flex-1 min-w-0">

                    {/* STATUS TAB */}
                    {activeTab === 'status' && (
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="h-3 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500" />
                            <div className="p-6 sm:p-8 md:p-12 text-center">

                                {/* Animated Icon */}
                                <div className="mb-6 flex justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-ping opacity-20" />
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                                            <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                    Application Submitted!
                                </h1>
                                <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto">
                                    Your application has been successfully submitted. We've received your information and will review it shortly.
                                </p>

                                {/* Progress Steps */}
                                <div className='flex justify-center'>
                                <StatusTracker />
                                </div>
                                {/* <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-5 sm:p-6 text-left max-w-md mx-auto">
                                    <h3 className="font-semibold text-green-900 mb-4 text-center text-sm sm:text-base">
                                        Application Progress
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Application Submitted', done: true, desc: 'Your form has been received' },
                                            { label: 'Under Review', done: false, desc: 'Our team will review within 2–3 days' },
                                            { label: 'Decision', done: false, desc: 'You will be notified via email' },
                                        ].map((step, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                                                    ${step.done ? 'bg-green-500' : 'bg-gray-200'}`}>
                                                    {step.done
                                                        ? <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        : <div className="w-2 h-2 rounded-full bg-gray-400" />
                                                    }
                                                </div>
                                                <div>
                                                    <p className={`text-sm font-semibold ${step.done ? 'text-green-800' : 'text-gray-500'}`}>
                                                        {step.label}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{step.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    )}

                    {/* DOWNLOAD TAB */}
                    {activeTab === 'download' && (
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            <div className="h-3 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500" />
                            <div className="p-6 sm:p-8 md:p-12 text-center">

                                <div className="mb-6 flex justify-center">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>

                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                    Download Your PDF
                                </h2>
                                <p className="text-gray-500 mb-8 text-sm sm:text-base max-w-md mx-auto">
                                    Download a copy of your submitted application for your records.
                                </p>

                                {/* PDF File Card */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 sm:p-6 mb-6 max-w-md mx-auto">
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-semibold text-gray-800">Application Form</p>
                                                <p className="text-xs text-gray-500">PDF Document</p>
                                            </div>
                                        </div>
                                        <span className="text-xs bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full whitespace-nowrap">
                                            Ready
                                        </span>
                                    </div>
                                </div>

                                {/* Downloader */}
                                <div className="flex justify-center">
                                    {isLoading ? (
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <svg className="animate-spin w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Preparing your document...
                                        </div>
                                    ) : (
                                        <CandidatePDFDownloader
                                            data={data[0]}
                                            previous_school={previous_school}
                                            priority_school={priority_school}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationSubmitted;