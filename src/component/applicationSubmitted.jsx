import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useGetApplicantPDFinfo } from '../../api/client/applicant';
import CandidatePDFDownloader from './template/pdf-template';

const ApplicationSubmitted = () => {

    const navigate = useNavigate();

    const { data, isSuccess, isError, isLoading } = useGetApplicantPDFinfo()

    return (
        <div className='max-w-5xl mx-auto'>
            <Navbar />
            <div className="mt-10 flex items-center justify-center p-4">

                <div className="max-w-2xl w-full">
                    {/* Main Card */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Top Gradient Bar */}
                        <div className="h-3 bg-gradient-to-r from-green-400 via-green-500 to-emerald-500"></div>

                        {/* Content */}
                        <div className="p-8 md:p-12 text-center">
                            {/* Success Icon */}
                            <div className="mb-6 flex justify-center">
                                <div className="relative">
                                    {/* Outer Circle Animation */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-ping opacity-20"></div>

                                    {/* Icon Circle */}
                                    <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                                        <svg
                                            className="w-14 h-14 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2.5}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Success Title */}
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Application Submitted!
                            </h1>

                            {/* Success Message */}
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Your application has been successfully submitted. We've received your information and will review it shortly.
                            </p>

                            {/* Info Box */}
                            {/* <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-green-900 mb-2">What's Next?</h3>
                                        <ul className="text-sm text-green-800 space-y-1">
                                            <li>• You'll receive a confirmation email shortly</li>
                                            <li>• Our team will review your application within 2-3 business days</li>
                                            <li>• We'll contact you if we need any additional information</li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}

                            {/* Reference Number */}
                            {/* <div className="bg-gray-50 rounded-lg p-4 mb-8 inline-block">
                                <p className="text-sm text-gray-500 mb-1">Reference Number</p>
                                <p className="text-xl font-mono font-bold text-gray-900">
                                    APP-{Math.random().toString(36).substring(2, 9).toUpperCase()}
                                </p>
                            </div> */}

                            {/* Action Buttons */}
                            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
                                >
                                    Go to Dashboard
                                </button>
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-lg border-2 border-gray-300 transition"
                                >
                                    Back to Home
                                </button>
                            </div> */}

                            {/* Footer Note */}
                            {/* <p className="text-sm text-gray-500 mt-8">
                                Need help? Contact us at{' '}
                                <a href="mailto:support@example.com" className="text-green-600 hover:text-green-700 font-medium">
                                    support@example.com
                                </a>
                            </p> */}
                            <div className='flex justify-center'>
                                {isLoading ? <p>Loading...</p> :
                                    <CandidatePDFDownloader data={data[0]} />
                                }
                            </div>
                        </div>
                    </div>


                    {/* Additional Info Cards */}
                    {/* <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white rounded-lg p-4 shadow-md text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">Email Sent</h4>
                            <p className="text-xs text-gray-600">Check your inbox</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">Verified</h4>
                            <p className="text-xs text-gray-600">All data validated</p>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-md text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">Processing</h4>
                            <p className="text-xs text-gray-600">2-3 business days</p>
                        </div>
                    </div> */}
                </div>


            </div>
        </div>
    );
};

export default ApplicationSubmitted;