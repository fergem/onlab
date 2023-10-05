import { Stack, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";
import { JobFilterLocalStorageKey } from "../components/job-components/JobHomeFilter";
import JobList from "../components/job-components/JobList";
import JobPageFilter from "../components/job-components/JobPageFilter";
import { useGetJobs } from "../hooks/react-query/JobHooks";
import { DefaultJobFilter, JobFilter, JobFunctions } from "../models/Job";

export default function Jobs() {
  const [jobFilter, setJobFilter] = useLocalStorage<JobFilter>({
    key: JobFilterLocalStorageKey,
    defaultValue: DefaultJobFilter,
    deserialize: JobFunctions.deserializeJobFromStorage,
  });
  const { jobs, error, loading, listJobs } = useGetJobs(jobFilter);

  const handleSetJobFilter = (filter: JobFilter) => {
    setJobFilter(filter);
  };
  useEffect(() => {
    listJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobFilter]);

  return (
    <Stack align="center">
      <Title order={1} align="center" ml="240px">
        Available jobs
      </Title>
      <JobPageFilter jobFilter={jobFilter} setJobFilter={handleSetJobFilter} />

      <Stack w="70%" align="center" ml="240px">
        <JobList
          jobs={jobs}
          loading={loading}
          error={error}
          refetch={listJobs}
        />
      </Stack>
    </Stack>
  );
}
