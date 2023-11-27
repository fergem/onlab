import { Group, Stack, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import JobList from "../components/job-components/JobList";
import JobPageFilter from "../components/job-components/JobPageFilter";
import { useGetJobs } from "../hooks/react-query/JobHooks";
import { JobFilterLocalStorageKey } from "../hooks/useJobFilter";
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

  return (
    <Stack align="center">
      <Group align="flex-start" position="center" noWrap w="80%">
        <JobPageFilter
          jobFilter={jobFilter}
          setJobFilter={handleSetJobFilter}
        />
        <Stack align="center" w="100%">
          <Title order={1} align="center">
            Available jobs
          </Title>
          <JobList
            jobs={jobs}
            loading={loading}
            error={error}
            refetch={listJobs}
          />
        </Stack>
      </Group>
    </Stack>
  );
}
