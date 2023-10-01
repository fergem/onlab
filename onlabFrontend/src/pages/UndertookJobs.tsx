import { Stack, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import JobList from "../components/job-components/JobList";
import { useGetUserUnderTookJobs } from "../hooks/JobHooks";
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
        <StatusBadge filter={filter} setFilter={handleSetFilter} />
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
