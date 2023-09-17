import {
  ActionIcon,
  Box,
  Grid,
  Image,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useProgressJob } from "../../hooks/JobHooks";
import Job from "../../models/Job";
import { baseProfilePicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";

export interface IPropsJobApprovalCard {
  job: Job;
}

export function JobApprovalCard({ job }: IPropsJobApprovalCard) {
  const { approveJob, declineJob } = useProgressJob();

  const handleApproveJob = () => {
    approveJob(job.id);
  };
  const handleDeclineJob = () => {
    declineJob(job.id);
  };

  return (
    <Paper shadow="sm" p="md" withBorder>
      <Grid align="center" justify="center">
        <Grid.Col span={4}>
          <Box maw="100px">
            <Image
              radius="md"
              src={
                job.petSitterUserInformation?.picture
                  ? `data:image/png;base64,${job.petSitterUserInformation.picture}`
                  : baseProfilePicture
              }
              alt="Job picture"
            />
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text size="xs">
            {job.petSitterUserInformation?.userName} wants to apply for your job
          </Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Stack align="center" justify="center">
            <ActionIcon
              color="green"
              size="lg"
              variant="filled"
              onClick={handleApproveJob}
            >
              <IconCheck />
            </ActionIcon>
            <ActionIcon
              color="red"
              size="lg"
              variant="filled"
              onClick={handleDeclineJob}
            >
              <IconX />
            </ActionIcon>
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

export interface IPropsJobApprovalList {
  approvals: Job[];
  loading: boolean;
  error: boolean;
  refetch(): void;
}

export default function JobApprovalList({
  approvals,
  loading,
  error,
  refetch,
}: IPropsJobApprovalList) {
  return (
    <LoadingBoundary
      loading={loading}
      error={error}
      refetch={refetch}
      isEmpty={approvals.length === 0}
    >
      <Stack justify="center">
        {approvals.map((x) => (
          <JobApprovalCard key={x.id} job={x} />
        ))}
      </Stack>
    </LoadingBoundary>
  );
}
