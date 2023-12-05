/* eslint-disable react/no-unescaped-entities */
import {
  ActionIcon,
  Group,
  Pagination,
  Paper,
  Select,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useGetAppliedJobs } from "../../hooks/react-query/JobHooks";
import useJobAndApplicationFilter from "../../hooks/useJobAndApplicationFilter";
import { JobStatusData } from "../../models/Job";
import { JobApplicationStatusData } from "../../models/JobApplication";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import JobApplicationComments from "./JobApplicationComments";
import MessagebarPetSitter from "./MessagebarPetSitter";

const appliedJobsMessagesKey = "messages";
export default function ApplicationMessagesPetSitter() {
  const {
    filter,
    handleSetPageNumber,
    handleSetJobStatus,
    handleSetJobApplicationStatus,
  } = useJobAndApplicationFilter();

  const { jobs, isError, isLoading, refetchJobs } = useGetAppliedJobs(
    filter,
    appliedJobsMessagesKey
  );

  const [selectedApplicationID, setSelectedApplicationID] = useState<
    number | undefined
  >();

  const appliedJob = useMemo(() => {
    return jobs?.data.find((s) => s.id === selectedApplicationID);
  }, [jobs?.data, selectedApplicationID]);

  const handleSetSelected = (applicationID: number) =>
    setSelectedApplicationID(applicationID);

  const handleBack = () => {
    setSelectedApplicationID(undefined);
  };

  return (
    <Paper p="md" shadow="sm" withBorder>
      <Stack h="100%" justify="center">
        {!appliedJob && (
          <Group align="center" noWrap mb={15}>
            <Select
              label="Job status"
              value={filter.status}
              onChange={handleSetJobStatus}
              data={JobStatusData}
            />
            <Select
              label="Application status"
              value={filter.jobApplicationStatus}
              onChange={handleSetJobApplicationStatus}
              data={JobApplicationStatusData}
            />
          </Group>
        )}
        <Group>
          {appliedJob ? (
            <Group align="center" mb={5} noWrap>
              <Tooltip label="Back">
                <ActionIcon
                  variant="subtle"
                  color="dark"
                  onClick={handleBack}
                  radius="md"
                  size="lg"
                >
                  <IconArrowBack />
                </ActionIcon>
              </Tooltip>
              <Title order={4} align="center">
                {appliedJob.title}
              </Title>
            </Group>
          ) : (
            <Text fw={1000} fz={17} lineClamp={2} align="center">
              Chat with the people, who's job you applied to.
            </Text>
          )}
        </Group>

        {!appliedJob && (
          <LoadingBoundary
            isLoading={isLoading}
            isError={isError}
            refetch={refetchJobs}
          >
            <Stack spacing={0}>
              {jobs?.data.map((s) => (
                <MessagebarPetSitter
                  appliedJob={s}
                  key={s.id}
                  select={handleSetSelected}
                />
              ))}
            </Stack>
          </LoadingBoundary>
        )}
        {appliedJob && (
          <JobApplicationComments
            application={appliedJob.jobApplication}
            miw={300}
          />
        )}
        {!appliedJob && jobs && (
          <Stack align="center">
            <Pagination
              value={jobs.currentPage}
              onChange={handleSetPageNumber}
              total={jobs.totalPages}
            />
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
