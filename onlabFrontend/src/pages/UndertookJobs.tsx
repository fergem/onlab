import { Stack, Title } from "@mantine/core";
import StatusBadge from "../components/StatusBadge";
import JobList from "../components/job-components/JobList";
import { useGetUserUnderTookJobs } from "../hooks/JobHooks";
import { Status } from "../models/Job";

export default function UndertookJobs() {
  const { jobs, error, loading, listJobs } = useGetUserUnderTookJobs();
  console.log(jobs);
  return (
    <Stack align="center" justify="center">
      <Title order={1}>Undertook jobs</Title>
      <Stack w="95%">
        <Stack>
          <StatusBadge status={Status.WaitingForApproval} />
          <JobList
            jobs={jobs}
            loading={loading}
            error={error}
            refetch={listJobs}
          />
        </Stack>
        <Stack>
          <StatusBadge status={Status.Inprogress} />
          <JobList
            jobs={jobs.filter((s) => s.status === Status.Inprogress)}
            loading={loading}
            error={error}
            refetch={listJobs}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
