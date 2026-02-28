import React from 'react'

function ApplicantReviewHeader({ name }) {
    return (
        <div className="mt-6">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">Admin Review</p>
            <h1 className="text-2xl font-bold text-gray-900">Student Eligibility Verification</h1>
            <p className="text-sm text-gray-500 mt-1">Review {name} eligibility</p>
        </div>
    )
}

export default ApplicantReviewHeader;