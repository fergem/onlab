import { Box, Container, Title, Text, Group, Stack, Grid } from "@mantine/core";
import { useState } from "react";
import JobFilter from "../components/job-components/JobFilter";
import { JobList } from "../components/job-components/JobList";
import { useGetJobs } from "../hooks/JobHooks";
import { DefaultJobParameters, JobParameters } from "../models/Job";

export default function Jobs() {
  const [jobFilter, setJobFilter] =
    useState<JobParameters>(DefaultJobParameters);
  const [jobs, error, loading, refetch] = useGetJobs(jobFilter);

  return (
    <Container>
      <Stack align="center" justify="center">
        <Title order={1}>How does it work?</Title>
        <Box px="10%">
          <Text fz="lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Provident iusto
            quibusdam, fugiat eius, similique accusantium possimus alias neque
            cupiditate porro molestiae dolore sunt!
          </Text>
        </Box>
      </Stack>

      <Grid align="top" justify="center" mt="2%">
        <Grid.Col span={4}>
          <JobFilter
            jobFilter={jobFilter}
            setJobFilter={setJobFilter}
            refetch={refetch}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack align="center" justify="center">
            <Title order={2}>Available jobs</Title>
            <JobList
              jobs={jobs}
              loading={loading}
              error={error}
              refetch={refetch}></JobList>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
