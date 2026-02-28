import { useState } from "react";
import { useNavigate } from "react-router-dom";

const statusStyles = {
    completed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    rejected: "bg-red-50 text-red-700 ring-1 ring-red-200",
    "in review": "bg-violet-50 text-violet-700 ring-1 ring-violet-200"
};

function TestingTable({ applications }) {

    const navigate = useNavigate();
    const [isOpenModal, setModal] = useState(false);
    const [applicantID, setApplicantID] = useState(false);
    const onClose = () => setModal(false);

    // Extracted so both desktop and mobile use identical logic
    const handleView = (app) => {
        if (app.application_stage) {
            navigate(`/admin/testing/${app.application_stage}?applicantID=${app.applicantID}`);
        } else {
            navigate(`/admin/testing/view-form-1?applicantID=${app.applicantID}`);
        }
        setApplicantID(app.applicantID);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-5">

            {isOpenModal && (
                <ViewFormModal isOpen={isOpenModal} onClose={onClose} applicantID={applicantID} />
            )}

            {/* ── DESKTOP TABLE (md and above) ── */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs font-medium uppercase tracking-wider">
                            <th className="text-left px-5 py-3">Application ID</th>
                            <th className="text-left px-5 py-3">Name</th>
                            <th className="text-left px-5 py-3">Grade</th>
                            <th className="text-left px-5 py-3">School Type</th>
                            <th className="text-left px-5 py-3">Status</th>
                            <th className=" px-5 py-3">Actions</th>
                            {/* <th className="px-5 py-3" /> */}
                        </tr>
                    </thead>
                    <tbody>
                        {applications?.map((app, i) => (
                            <tr
                                key={i}
                                className={`border-t border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}
                            >
                                <td className="px-5 py-3.5 font-mono text-xs text-slate-600">
                                    {"SSESP" + app.applicantID}
                                </td>
                                <td className="px-5 py-3.5 font-medium text-slate-800">
                                    {app.studentName}
                                </td>
                                <td className="px-5 py-3.5 text-slate-600">
                                    {app.studyingInClass}
                                </td>
                                <td className="px-5 py-3.5 text-slate-600">
                                    {app.schoolCategory}
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[app.application_status]}`}>
                                        {app.application_status}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5 text-right">
                                    <button
                                        onClick={() => handleView(app)}
                                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ── MOBILE CARD LIST (below md) ── */}
            <div className="sm:hidden divide-y divide-slate-100">
                {applications?.map((app, i) => (
                    <div
                        key={i}
                        className={`p-4 transition-colors hover:bg-slate-50/70 ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}
                    >
                        {/* Row 1: Name + Status badge */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="min-w-0">
                                <p className="font-semibold text-slate-800 text-sm truncate">
                                    {app.studentName}
                                </p>
                                <p className="text-xs text-slate-400 font-mono mt-0.5">
                                    {"SSESP" + app.applicantID}
                                </p>
                            </div>
                            {/* ✅ Fixed: was app.status, now app.application_status */}
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0 ${statusStyles[app.application_status]}`}>
                                {app.application_status}
                            </span>
                        </div>

                        {/* Row 2: Grade + School type pills */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {app.studyingInClass && (
                                <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                                    Grade: {app.studyingInClass}
                                </span>
                            )}
                            {app.schoolCategory && (
                                <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                                    {app.schoolCategory}
                                </span>
                            )}
                        </div>

                        {/* Row 3: View button full width on mobile */}
                        <button
                            onClick={() => handleView(app)}
                            className="cursor-pointer w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
                        >
                            👁 View Application
                        </button>
                    </div>
                ))}
            </div>

            {/* ── EMPTY STATE ── */}
            {(!applications || applications.length === 0) && (
                <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                    <svg className="w-10 h-10 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-sm font-medium">No applications found</p>
                </div>
            )}
        </div>
    );
}

export default TestingTable;