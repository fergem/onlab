import { Box, Container, Title, Text, Group, Stack } from "@mantine/core";
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

      <Group align="top" position="center">
        <JobFilter
          jobFilter={jobFilter}
          setJobFilter={setJobFilter}
          refetch={refetch}></JobFilter>
        <Stack align="center" justify="center">
          <Title order={2}>Available jobs</Title>
          <JobList
            jobs={jobs}
            loading={loading}
            error={error}
            refetch={refetch}></JobList>
        </Stack>
      </Group>
    </Container>
  );
}
