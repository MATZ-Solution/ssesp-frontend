import Pagination from "../../pagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationFilters from "../ApplicationFilters";
import ApplicantsTable from "../../cards/applicants-table";
import { useExportApplicants, useGetDashbaordApplicantData } from "../../../../api/client/admin";

const Applications = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    class: "",
    schoolType: "",
    gender: "",
    district: "",
    status: "",
  });

  const {
    data: applicantData,
    isLoading: applicantIsLoading,
    totalPages,
  } = useGetDashbaordApplicantData({
    page,
    class: filters.class,
    schoolType: filters.schoolType,
    gender: filters.gender,
    district: filters.district,
  });

  const { exportApplicants, isPending: isExporting } = useExportApplicants();

  useEffect(() => {
    navigate("?page=1", { replace: true });
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleExport = () => {
    exportApplicants({
      class: filters.class,
      schoolType: filters.schoolType,
      gender: filters.gender,
      district: filters.district,
    });
  };

  return (
    <div>
      <main className="flex-1 space-y-6">

        {/* Header Section */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Good morning, Admin 👋
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Here's what's happening with applications today.
            </p>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`px-4 py-2 rounded-md text-white transition ${
              isExporting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isExporting ? "Exporting..." : "Export to Excel"}
          </button>
        </div>

        {/* Filters */}
        <ApplicationFilters
          filters={filters}
          onChange={handleFilterChange}
        />

        {/* Table */}
        {applicantData?.length === 0 ? (
          <p>No Data Found.</p>
        ) : (
          <ApplicantsTable applications={applicantData} />
        )}

        {/* Pagination */}
        {applicantData?.length > 0 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}
      </main>
    </div>
  );
};

export default Applications;