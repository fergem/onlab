import { Box, Grid, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Job from "../../models/Job";
import { baseProfilePicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";

export interface IPropsJobCard {
  job: Job;
}

export function JobCard({ job }: IPropsJobCard) {
  const navigate = useNavigate();
  return (
    <Paper
      shadow="sm"
      p="sm"
      withBorder
      onClick={() => navigate("/job", { state: { job } })}
    >
      <Stack align="left" justify="center">
        <Grid justify="center">
          <Grid.Col span={4}>
            <Box maw="175px" mah="175px">
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
            </Box>
          </Grid.Col>

          <Grid.Col span={8}>
            <Stack justify="top">
              <Title order={3}>{job?.ownerUserInformation?.userName}</Title>
              <Text size="sm">${job.payment}/hours</Text>
              <Text size="sm">{job.location}</Text>
              <Text lineClamp={4}>{job.description}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Paper>
  );
}

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
    <LoadingBoundary loading={loading} error={error} refetch={refetch}>
      <Stack justify="center">
        {jobs.map((x) => (
          <JobCard key={x.id} job={x} />
        ))}
      </Stack>
    </LoadingBoundary>
  );
}
