import { Group, Pagination, Stack, Title } from "@mantine/core";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
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
  const { jobs, isError, isLoading, refetchJobs } = useGetJobs(jobFilter);
  const isDesktop = useMediaQuery("(min-width: 56.25em)");

  const handleSetJobFilter = (filter: JobFilter) => {
    setJobFilter(filter);
  };

  const handleSetPageNumber = (page: number) => {
    setJobFilter((prev) => ({ ...prev, pageNumber: page }));
  };

  return (
    <Stack align="center">
      <Group align="flex-start" position="center" noWrap={isDesktop} w="80%">
        <JobPageFilter
          jobFilter={jobFilter}
          setJobFilter={handleSetJobFilter}
        />
        <Stack align="center" w="100%">
          <Title order={1} align="center">
            Available jobs
          </Title>
          <JobList
            jobs={jobs?.data}
            isLoading={isLoading}
            isError={isError}
            refetch={refetchJobs}
          />
          {jobs && (
            <Pagination
              value={jobs.currentPage}
              onChange={handleSetPageNumber}
              total={jobs.totalPages}
            />
          )}
        </Stack>
      </Group>
    </Stack>
  );
}
