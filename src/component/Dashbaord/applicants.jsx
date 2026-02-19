import React from 'react'
import RecentApplicationsTable from '../cards/RecentApplicationsTable'
import { useGetDashbaordApplicantData, useGetDashbaordData } from "../../../api/client/admin";

function Applicants() {

    const { data: applicantData, isLoading: applicantIsLoading } = useGetDashbaordApplicantData()

    return (
        <div>
            {applicantIsLoading ? <p>Loading...</p> :
                <RecentApplicationsTable applications={applicantData} />
            }
        </div>
    )
}

export default Applicants