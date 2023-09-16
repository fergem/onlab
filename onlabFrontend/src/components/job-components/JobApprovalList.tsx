import { Box, Button, Group, Image, Paper, Stack, Text } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useApproveJob, useDeclineJob } from "../../hooks/JobHooks";
import Job from "../../models/Job";
import { baseProfilePicture } from "../../utility/constants";
import LoadingBoundary from "../LoadingBoundary";

export interface IPropsJobApprovalCard {
  job: Job;
}

export function JobApprovalCard({ job }: IPropsJobApprovalCard) {
  const { approveJob } = useApproveJob();
  const { declineJob } = useDeclineJob();

  const handleApproveJob = () => {
    approveJob(job.id);
  };
  const handleDeclineJob = () => {
    declineJob(job.id);
  };

  return (
    <Paper shadow="sm" p="sm" withBorder>
      <Group>
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

        <Text size="xs">
          {job.petSitterUserInformation?.userName} wants to apply for your job
        </Text>

        <Stack>
          <Button size="xs" onClick={handleApproveJob}>
            <IconCheck />
          </Button>
          <Button size="xs" onClick={handleDeclineJob}>
            <IconX />
          </Button>
        </Stack>
      </Group>
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
