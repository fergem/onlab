import { Grid, Stack, Title } from "@mantine/core";
import StatusBadge from "../components/StatusBadge";
import JobList from "../components/job-components/JobList";
import { useGetUserUnderTookJobs } from "../hooks/JobHooks";
import { Status } from "../models/Job";

export default function UndertookJobs() {
  const { jobs, error, loading, listJobs } = useGetUserUnderTookJobs();

  return (
    <Stack align="center" justify="center">
      <Title order={1}>Undertook jobs</Title>
      <Grid w="95%">
        <Grid.Col span={4}>
          <Stack>
            <StatusBadge status={Status.WaitingForApproval} />
            <JobList
              jobs={jobs.filter((s) => s.status === Status.WaitingForApproval)}
              loading={loading}
              error={error}
              refetch={listJobs}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <StatusBadge status={Status.Inprogress} />
            <JobList
              jobs={jobs.filter((s) => s.status === Status.Inprogress)}
              loading={loading}
              error={error}
              refetch={listJobs}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <StatusBadge status={Status.Done} />
            <JobList
              jobs={jobs.filter((s) => s.status === Status.Done)}
              loading={loading}
              error={error}
              refetch={listJobs}
            />
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
