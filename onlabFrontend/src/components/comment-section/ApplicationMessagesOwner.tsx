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
import { IconArrowBack, IconMoodSad } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useGetPostedJobs } from "../../hooks/react-query/JobHooks";
import useJobAndApplicationFilter from "../../hooks/useJobAndApplicationFilter";
import { JobStatusData } from "../../models/Job";
import { JobApplicationStatusData } from "../../models/JobApplication";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import JobApplicationComments from "./JobApplicationComments";
import JobMessagebar from "./JobMessagebar";
import MessagebarOwner from "./MessagebarOwner";

export default function ApplicationMessagesOwner() {
  const {
    filter,
    handleSetPageNumber,
    handleSetJobStatus,
    handleSetJobApplicationStatus,
  } = useJobAndApplicationFilter();

  const { postedJobs, isLoadingPostedJobs, isErrorPosted, refetchPostedJobs } =
    useGetPostedJobs(filter);

  const [selectedPostedJobID, setSelectedPostedJobID] = useState<
    number | undefined
  >();
  const [selectedApplicationID, setSelectedApplicationID] = useState<
    number | undefined
  >();

  const selectedPostedJob = useMemo(() => {
    return postedJobs?.data.find((s) => s.id === selectedPostedJobID);
  }, [postedJobs?.data, selectedPostedJobID]);

  const selectedPostedApplication = useMemo(() => {
    return selectedPostedJob?.jobApplications.find(
      (s) => s.id === selectedApplicationID
    );
  }, [selectedApplicationID, selectedPostedJob?.jobApplications]);

  const handleSetSelectedApplication = (applicationID: number) =>
    setSelectedApplicationID(applicationID);

  const handleSetSelectedJob = (jobID: number) => setSelectedPostedJobID(jobID);

  const handleBack = () => {
    setSelectedPostedJobID(undefined);
    setSelectedApplicationID(undefined);
  };

  const hasSelectedJobButNotApplicationWithData =
    selectedPostedJob &&
    !selectedPostedApplication &&
    selectedPostedJob.jobApplications.length > 0;
  const hasSelectedJobButNotApplicationWithoutData =
    selectedPostedJob &&
    !selectedPostedApplication &&
    selectedPostedJob.jobApplications.length === 0;

  return (
    <Paper p="md" shadow="sm" withBorder>
      <Stack h="100%" justify="center">
        {!selectedPostedJob && (
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
          {selectedPostedJob ? (
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
                {selectedPostedJob.title}
              </Title>
            </Group>
          ) : (
            <Text fw={1000} fz={17} lineClamp={2} align="center">
              Choose a job so that you can see all the messages related to it.
            </Text>
          )}
        </Group>

        {!selectedPostedJob && (
          <LoadingBoundary
            isLoading={isLoadingPostedJobs}
            isError={isErrorPosted}
            refetch={refetchPostedJobs}
          >
            <Stack spacing={0}>
              {postedJobs?.data.map((s) => (
                <JobMessagebar
                  job={s}
                  key={s.id}
                  select={handleSetSelectedJob}
                />
              ))}
            </Stack>
          </LoadingBoundary>
        )}
        {hasSelectedJobButNotApplicationWithData &&
          selectedPostedJob.jobApplications.map((s) => (
            <Stack spacing={0} key={s.id}>
              <MessagebarOwner
                jobApplication={s}
                select={handleSetSelectedApplication}
              />
            </Stack>
          ))}
        {hasSelectedJobButNotApplicationWithoutData && (
          <Paper p="md" shadow="sm" withBorder>
            <Stack align="center" justify="center" my={20}>
              <IconMoodSad size={130} />
              <Title order={3} size={20}>
                No applications to this job yet.
              </Title>
            </Stack>
          </Paper>
        )}
        {selectedPostedApplication && (
          <JobApplicationComments
            application={selectedPostedApplication}
            miw={300}
          />
        )}
        {!selectedPostedJob && postedJobs && (
          <Stack align="center">
            <Pagination
              value={postedJobs.currentPage}
              onChange={handleSetPageNumber}
              total={postedJobs.totalPages}
              align="center"
            />
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
