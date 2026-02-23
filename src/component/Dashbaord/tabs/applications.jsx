import Pagination from "../../pagination";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationFilters from "../ApplicationFilters";
import ApplicantsTable from "../../cards/applicants-table";
import { useGetDashbaordApplicantData } from "../../../../api/client/admin";
import { districts } from "../../../../data/new-district";

const Applications = () => {

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    class: "",
    schoolType: "",
    gender: "",
    district: ""
  });

  const { data: applicantData, isLoading: applicantIsLoading, totalPages } =
    useGetDashbaordApplicantData({
      page,
      class: filters.class,
      schoolType: filters.schoolType,
      gender: filters.gender,
      district: filters.district
    });

  useEffect(() => {
    navigate("?page=1", { replace: true });
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  if (applicantIsLoading) return <p>loading...</p>;

  return (
    <div>
      <main className="flex-1  space-y-6">
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
        {applicantData?.length === 0 ?
          <p>No Data Found.</p> :
          (<ApplicantsTable applications={applicantData} />)}

        {/* <ViewFormModal isOpen={true} title='Student Information'/> */}

        {applicantData?.length > 0 &&
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        }
      </main>
    </div>
  );
};

export default Applications;