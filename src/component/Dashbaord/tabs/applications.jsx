import Pagination from "../../pagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecentApplicationsTable from "../../cards/RecentApplicationsTable";
import { useGetDashbaordApplicantData } from "../../../../api/client/admin"

const Applications = () => {

  const navigate = useNavigate()
  let [page, setPage] = useState(1)
  const { data: applicantData, isLoading: applicantIsLoading, totalPages } = useGetDashbaordApplicantData({ page })

  useEffect(() => {
    navigate("?page=1", { replace: true });
  }, []);

  if (applicantIsLoading) return <p>loading...</p>

  return (
    <div>
      {" "}
      <main className="flex-1 p-5 md:p-7 space-y-6">
        {/* Welcome */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Good morning, Admin 👋
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Here's what's happening with applications today.
            </p>
          </div>
          {/* <button className="hidden sm:flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-teal-700 transition-colors shadow-sm">
            <Filter size={14} />
            Export Report
          </button> */}
        </div>

        {/* Stat cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div> */}

        {/* Table */}
        <RecentApplicationsTable applications={applicantData} />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />

      </main>
    </div>
  );
};

export default Applications;
