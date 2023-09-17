import { Grid, Stack, Title } from "@mantine/core";
import { useState } from "react";
import JobFilter from "../components/job-components/JobFilter";
import JobList from "../components/job-components/JobList";
import { useGetJobs } from "../hooks/JobHooks";
import { DefaultJobParameters, JobParameters } from "../models/Job";

export default function Jobs() {
  const [jobFilter, setJobFilter] =
    useState<JobParameters>(DefaultJobParameters);
  const { jobs, error, loading, listJobs } = useGetJobs(jobFilter);

  return (
    <Stack justify="center">
      <Title order={1} align="center">
        Available jobs
      </Title>
      <Grid align="top" justify="center" mt="2%">
        <Grid.Col span={3}>
          <JobFilter
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
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
