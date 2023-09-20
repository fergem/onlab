import { Grid, Stack, Title } from "@mantine/core";
import { useState } from "react";
import JobList from "../components/job-components/JobList";
import JobPageFilter from "../components/job-components/JobPageFilter";
import { useGetJobs } from "../hooks/JobHooks";
import { DefaultJobFilter, JobFilter } from "../models/Job";

export default function Jobs() {
  const [jobFilter, setJobFilter] = useState<JobFilter>(DefaultJobFilter);
  const { jobs, error, loading, listJobs } = useGetJobs(jobFilter);

  const handleSetJobFilter = (filter: JobFilter) => {
    setJobFilter(filter);
  };

  return (
    <Stack justify="center">
      <Title order={1} align="center">
        Available jobs
      </Title>
      <Grid align="top" justify="center" mt="2%">
        <Grid.Col span={3}>
          <JobPageFilter
            jobFilter={jobFilter}
            setJobFilter={handleSetJobFilter}
            refetch={listJobs}
          />
        </Grid.Col>
        <Grid.Col span={7}>
          <JobList
            jobs={jobs}
            loading={loading}
            error={error}
            refetch={listJobs}
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
