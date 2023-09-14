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
  const { approveJob, isApproveing, error } = useApproveJob();
  const { declineJob, isDeciling, errorr } = useDeclineJob();

  const handleApproveJob = () => {
    approveJob(job.id);
  };
  const handleDeclineJob = () => {
    declineJob(job.id);
  };

  return (
    <Paper shadow="sm" p="sm" withBorder>
      <Group>
        <Box maw="50px" mah="50px">
          <Image
            fit="contain"
            radius="md"
            src={
              job.petSitterUserInformation?.picture
                ? `data:image/png;base64,${job.petSitterUserInformation.picture}`
                : baseProfilePicture
            }
            alt="Job picture"
          />
        </Box>

        <Text size="sm">
          {job.petSitterUserInformation?.userName} wants to apply for your job
        </Text>

        <Stack>
          <Button>
            <IconCheck onClick={handleApproveJob} />
          </Button>
          <Button onClick={handleDeclineJob}>
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
    <LoadingBoundary loading={loading} error={error} refetch={refetch}>
      <Stack justify="center">
        {approvals.map((x) => (
          <JobApprovalCard key={x.id} job={x} />
        ))}
      </Stack>
    </LoadingBoundary>
  );
}
