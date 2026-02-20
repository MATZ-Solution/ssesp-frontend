import Pagination from "../../pagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecentApplicationsTable from "../../cards/RecentApplicationsTable";
import { useGetDashbaordApplicantData } from "../../../../api/client/admin";
import ApplicationFilters from "../ApplicationFilters";

const Applications = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    grade: "",
    schoolType: "",
    gender: "",
  });

  const { data: applicantData, isLoading: applicantIsLoading, totalPages } =
    useGetDashbaordApplicantData({
      page,
      grade: filters.grade || undefined,
      schoolType: filters.schoolType || undefined,
      gender: filters.gender || undefined,
    });

  useEffect(() => {
    navigate("?page=1", { replace: true });
  }, []);

  // Reset to page 1 whenever filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  if (applicantIsLoading) return <p>loading...</p>;

  return (
    <div>
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
        </div>

        {/* Filters */}
        <ApplicationFilters filters={filters} onChange={handleFilterChange} />

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