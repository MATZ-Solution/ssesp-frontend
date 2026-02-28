import { useState } from "react";
import {
  ChevronRightIcon,
  ArrowUpRightIcon,
  ChevronLeftIcon,
} from "lucide-react";
import Pagination from "../pagination";

const statusStyles = {
  approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  rejected: "bg-red-50 text-red-700 ring-1 ring-red-200",
};

function RecentApplicationsTable({ applications }) {
  return (
    <div className=" bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-5">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-medium uppercase tracking-wider">
              <th className="text-left px-5 py-3">Application ID</th>
              <th className="text-left px-5 py-3">Name</th>
              <th className="text-left px-5 py-3">Grade</th>
              <th className="text-left px-5 py-3">School Type</th>
              <th className="text-left px-5 py-3">District</th>

              {/* <th className="text-left px-5 py-3">Date</th> */}
              <th className="text-left px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {applications?.map((app, i) => (
              <tr
                key={i}
                className={`border-t border-slate-50 hover:bg-slate-50/70 transition-colors ${
                  i % 2 === 0 ? "" : "bg-slate-50/30"
                }`}
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
                <td className="px-5 py-3.5 text-slate-600">{app.guardianDomicileDistrict}</td>

                {/* <td className="px-5 py-3.5 text-slate-500 text-xs">
                  {app.created_at}
                </td> */}
                <td className="px-5 py-3.5">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                      statusStyles[app.status]
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button className="text-slate-400 hover:text-teal-600 transition-colors">
                    <ArrowUpRightIcon size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-slate-100">
        {applications?.map((app, i) => (
          <div key={i} className="p-4 flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-slate-800 text-sm">
                {app.studentName}
              </p>
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
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {app.district}
                </span>{" "}
              </div>
            </div>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0 ${
                statusStyles[app.status]
              }`}
            >
              {app.status}
            </span>
          </div>
        ))}
      </div>

      {/* <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={(newPage) => setPage(newPage)}
      /> */}

      {/* Pagination footer */}
      {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-slate-100 bg-slate-50/40">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>
            {applications.length === 0
              ? "No results"
              : `${start}–${end} of ${applications.length}`}
          </span>
          <label className="flex items-center gap-1.5">
            Rows per page
            <select
              value={pageSize}
              onChange={handlePageSize}
              className="ml-1 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => goTo(safePage - 1)}
            disabled={safePage === 1}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeftIcon size={14} />
          </button>

          {pageNumbers().map((p, i) =>
            p === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="px-1.5 text-xs text-slate-400 select-none"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => goTo(p)}
                className={`min-w-[28px] h-7 text-xs rounded-lg font-medium transition-colors ${
                  p === safePage
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
                aria-label={`Go to page ${p}`}
                aria-current={p === safePage ? "page" : undefined}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => goTo(safePage + 1)}
            disabled={safePage === totalPages}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRightIcon size={14} />
          </button>
        </div>
      </div> */}
    </div>
  );
}

export default RecentApplicationsTable;
