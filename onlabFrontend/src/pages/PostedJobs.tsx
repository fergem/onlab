import JobApprovalList from "../components/job-components/JobApprovalList";
import JobList from "../components/job-components/JobList";
import { useGetApprovals, useGetUserPostedJobs } from "../hooks/JobHooks";
import { DefaultJobParameters } from "../models/Job";

export default function OwnerProfile() {
  const { jobs, error, loading, listJobs } =
    useGetUserPostedJobs(DefaultJobParameters);
  const { approvals, approvalsLoading, approvalsError, listApprovals } =
    useGetApprovals();

  return (
    <>
      {" "}
      <JobApprovalList
        approvals={approvals}
        loading={approvalsLoading}
        error={approvalsError}
        refetch={listApprovals}
      />
      ;
      <JobList jobs={jobs} loading={loading} error={error} refetch={listJobs} />
      ;
    </>
  );
}
