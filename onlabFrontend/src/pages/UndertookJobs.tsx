import { Grid, Stack, Title } from "@mantine/core";
import StatusBadge from "../components/StatusBadge";
import JobList from "../components/job-components/JobList";
import { useGetUserUnderTookJobs } from "../hooks/JobHooks";
import { StatusName } from "../models/Status";

export default function UndertookJobs() {
  const { jobs, error, loading, listJobs } = useGetUserUnderTookJobs();

  return (
    <Stack align="center" justify="center">
      <Title order={1}>Undertook jobs</Title>
      <Grid w="95%">
        <Grid.Col span={4}>
          <Stack>
            <StatusBadge status={StatusName.WaitingForApproval} />
            <JobList
              jobs={jobs.filter(
                (s) => s.status?.name === StatusName.WaitingForApproval
              )}
              loading={loading}
              error={error}
              refetch={listJobs}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <StatusBadge status={StatusName.Inprogress} />
            <JobList
              jobs={jobs.filter(
                (s) => s.status?.name === StatusName.Inprogress
              )}
              loading={loading}
              error={error}
              refetch={listJobs}
            />
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Stack>
            <StatusBadge status={StatusName.Done} />
            <JobList
              jobs={jobs.filter((s) => s.status?.name === StatusName.Done)}
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
