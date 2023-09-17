import { Center, Grid, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/AuthHooks";
import Job from "../../models/Job";
import { baseProfilePicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";

export interface IPropsJobList {
  jobs: Job[];
  loading: boolean;
  error: boolean;
  refetch(): void;
}

export default function JobList({
  jobs,
  loading,
  error,
  refetch,
}: IPropsJobList) {
  return (
    <LoadingBoundary
      loading={loading}
      error={error}
      refetch={refetch}
      isEmpty={jobs.length === 0}
    >
      <Stack justify="center">
        {jobs.map((x) => (
          <JobCard key={x.id} job={x} />
        ))}
      </Stack>
    </LoadingBoundary>
  );
}

export interface IPropsJobCard {
  job: Job;
}

export function JobCard({ job }: IPropsJobCard) {
  const navigate = useNavigate();
  const { user } = useUser();
  return (
    <Paper
      shadow="sm"
      p="md"
      withBorder
      onClick={() => navigate(`/jobs/${job.id}`, { state: { job } })}
    >
      <Stack align="left" justify="center">
        <Grid justify="center" align="center">
          <Grid.Col span={4}>
            <Center>
              <Image
                fit="contain"
                radius="md"
                src={
                  job?.ownerUserInformation?.picture
                    ? `data:image/png;base64,${job.ownerUserInformation.picture}`
                    : baseProfilePicture
                }
                alt="Job picture"
              />
            </Center>
          </Grid.Col>

          <Grid.Col span={8}>
            <Stack justify="top">
              <Title order={3}>
                {job?.ownerUserInformation?.id === user?.id
                  ? "Your job"
                  : `${job?.ownerUserInformation?.userName}'s job`}
              </Title>
              <Text size="sm">${job.payment}/hours</Text>
              <Text size="sm">{job.location}</Text>
              <Text lineClamp={2}>{job.description}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}
