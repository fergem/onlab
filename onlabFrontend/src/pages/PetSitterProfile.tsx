import JobList from "../components/job-components/JobList";
import { useGetUserUnderTookJobs } from "../hooks/JobHooks";

export default function PetSitterProfile() {
  const { jobs, error, loading, listJobs } = useGetUserUnderTookJobs();

  return (
    <JobList jobs={jobs} loading={loading} error={error} refetch={listJobs} />
  );
}
