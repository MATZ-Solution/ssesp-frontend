import React from 'react'

function FormHeader() {
    return (
        <div className="mt-8 bg-gradient-to-r from-green-800 to-green-600 rounded-t-2xl shadow-lg p-6 sm:p-8 text-white">
            <div className="text-center">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                    Sindh School Education Scholarship Program (SSESP)
                </h1>
                <p className="text-lg sm:text-xl font-semibold">
                    GOVERNMENT OF SINDH
                </p>
                <p className="text-base sm:text-lg">SINDH EDUCATION FOUNDATION</p>
                <p className="mt-4 text-sm sm:text-base bg-white/20 backdrop-blur-sm rounded-lg py-2 px-4 inline-block">
                    Application Form for Students of Government and SEF Schools in
                    Grade 6 , 7 , 8 , 9
                </p>
                <p className="text-sm mt-2">Session 2026-27</p>
            </div>
        </div>
    )
}

export default FormHeader