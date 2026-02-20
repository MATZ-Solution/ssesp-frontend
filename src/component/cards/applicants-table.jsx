import { useState } from "react";
import ViewFormModal from "../modal/view-form-modal";

const statusStyles = {
    approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    rejected: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

function ApplicantsTable({ applications }) {

    const [isOpenModal, setModal] = useState(false)
    const [applicantID, setApplicantID] = useState(false)
    const onClose = ()=> setModal(false)

    return (
        <div className=" bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-5">

            {isOpenModal && <ViewFormModal isOpen={isOpenModal} onClose={onClose} applicantID={applicantID}/>}

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs font-medium uppercase tracking-wider">
                            <th className="text-left px-5 py-3">Application ID</th>
                            <th className="text-left px-5 py-3">Name</th>
                            <th className="text-left px-5 py-3">Grade</th>
                            <th className="text-left px-5 py-3">School Type</th>
                            {/* <th className="text-left px-5 py-3">Date</th> */}
                            <th className="text-left px-5 py-3">Status</th>
                            <th className="px-5 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {applications?.map((app, i) => (
                            <tr
                                key={i}
                                className={`border-t border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"
                                    }`}
                            >
                                <td className="px-5 py-3.5 font-mono text-xs text-slate-600">
                                    {'SSESP'+app.applicantID}
                                </td>
                                <td className="px-5 py-3.5 font-medium text-slate-800">
                                    {app.studentName}
                                </td>
                                <td className="px-5 py-3.5 text-slate-600">{app.studyingInClass}</td>
                                <td className="px-5 py-3.5 text-slate-600">{app.schoolCategory}</td>
                                {/* <td className="px-5 py-3.5 text-slate-500 text-xs">
                  {app.created_at}
                </td> */}
                                <td className="px-5 py-3.5">
                                    <span
                                        className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[app.status]
                                            }`}
                                    >
                                        {app.status}
                                    </span>
                                </td>
                                {/* <td className="px-5 py-3.5 text-right">
                                    <button
                                    onClick={() => {
                                        setModal(true)
                                        setApplicantID(app.applicantID)
                                    }}
                                        className=" cursor-pointer
                                    inline-flex items-center gap-2
                                    px-4 py-1.5
                                    text-sm font-medium
                                    rounded-full
                                    bg-gradient-to-r from-teal-500 to-emerald-500
                                    text-white
                                    shadow-md
                                    hover:shadow-lg
                                    hover:scale-105
                                    active:scale-95
                                    transition-all duration-200
                                    "
                                    >
                                        👁 View
                                    </button>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile card list */}
            <div className="md:hidden divide-y divide-slate-100">
                {applications?.map((app, i) => (
                    <div
                        key={i}
                        className="p-4 flex items-start justify-between gap-3"
                    >
                        <div>
                            <p className="font-medium text-slate-800 text-sm">{app.studentName}</p>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">
                                {app.applicantID}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {app.studyingInClass}
                                </span>
                                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {app.schoolCategory}
                                </span>
                                {/* <span className="text-xs text-slate-400">{app.date}</span> */}
                            </div>
                        </div>
                        <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0 ${statusStyles[app.status]
                                }`}
                        >
                            {app.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ApplicantsTable;