import React from 'react'

function FormHeader() {
    return (
        <div className="mt-4 relative overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-600 rounded-t-2xl">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
                </div>
                {/* Decorative Lines */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 right-0 h-px bg-white transform -skew-y-12"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white transform skew-y-12"></div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 rounded-t-2xl shadow-lg p-6 sm:p-8 text-white">
                <div className="text-center">
                  {/* Application Details Badge */}
<div className="mb-4">
  <div className="bg-white/20 backdrop-blur-sm rounded-lg py-3 px-5 inline-block border border-white/20">
    <p className="text-sm sm:text-base font-semibold">
      Scholarship Application for Students of Government and SEF Schools  Grades 8 & 9
    </p>
    <p className="text-xs sm:text-sm mt-1 opacity-90">
      Eligibility: Students currently enrolled in Grades 7 and 8 may apply.
    </p>
  </div>
</div>


                    {/* Main Heading */}
                    <div className="space-y-1">
                        <p className="text-lg sm:text-xl font-semibold">
                            GOVERNMENT OF SINDH
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-px bg-white/30 w-8"></div>
                            <p className="text-base sm:text-lg font-medium">
                                SINDH EDUCATION FOUNDATION
                            </p>
                            <div className="h-px bg-white/30 w-8"></div>
                        </div>
                    </div>

                    {/* Session Info */}
                    <div className="mt-2">
                        <p className="text-sm">Session 2026-27</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormHeader