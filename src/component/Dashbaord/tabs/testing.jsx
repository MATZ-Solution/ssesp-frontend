import React from 'react'
import { useGetDashbaordApplicantTestingData } from '../../../../api/client/admin'
import Error from "../../error";
import Loader from "../../loader";
import ApplicantsTable from '../../cards/applicants-table';
import { useSearchParams } from 'react-router-dom';
import TestingTable from '../../cards/testing-table';

function Testing() {

    const [searchParams] = useSearchParams();
    const applicantID = searchParams.get("applicantID");

    const { data, isSuccess, isPending, isError, isLoading } = useGetDashbaordApplicantTestingData()
    if (isLoading) return <Loader />
    if (isError) return <Error />

    return (
        <div>
            {data?.length === 0 ? (
                <p>No Data Found.</p>
            ) : (
                <TestingTable applications={data} />
            )}
        </div>
    )
}

export default Testing