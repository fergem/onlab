import { Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import JobList from "../components/job-components/JobList";
import { useGetUserUnderTookJobs } from "../hooks/react-query/JobHooks";
import {
  DefaultJobFilterParticipant,
  JobFilterParticipant,
} from "../models/Job";

export default function UndertookJobs() {
  const [filter, setFilter] = useState(DefaultJobFilterParticipant);
  const { jobs, error, loading, listJobs } = useGetUserUnderTookJobs(filter);

  useEffect(() => {
    listJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleSetFilter = (newFilter: JobFilterParticipant) => {
    setFilter(newFilter);
  };
  return (
    <Stack align="center" justify="center">
      <Title order={2}>Undertook jobs</Title>
      <Stack w="60%">
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
