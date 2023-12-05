/* eslint-disable react/no-unescaped-entities */
import {
  ActionIcon,
  Group,
  Pagination,
  Paper,
  Select,
  Stack,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import LoadingBoundary from "../components/utility-components/LoadingBoundary";
import { useGetPostedJobs } from "../hooks/react-query/JobHooks";
import useJobAndApplicationFilter from "../hooks/useJobAndApplicationFilter";
import { JobStatusData } from "../models/Job";
import { JobApplicationStatusData } from "../models/JobApplication";
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

  return (
    <Paper p="md" shadow="sm" withBorder>
      <Stack align="center" h="100%" justify="center">
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
            <Group align="center" mb={5}>
              <Tooltip label="Back">
                <ActionIcon
                  variant="subtle"
                  color="dark"
                  onClick={handleBack}
                  radius="md"
                  size="lg"
                  m="sm"
                >
                  <IconArrowBack />
                </ActionIcon>
              </Tooltip>
              <Title order={4} align="center">
                {selectedPostedJob.title}
              </Title>
            </Group>
          ) : (
            <Title order={4} align="center" mb={20}>
              Chat with the people, who's job you applied to
            </Title>
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
        {selectedPostedJob &&
          !selectedPostedApplication &&
          selectedPostedJob.jobApplications.map((s) => (
            <Stack spacing={0} key={s.id}>
              <MessagebarOwner
                jobApplication={s}
                select={handleSetSelectedApplication}
              />
            </Stack>
          ))}
        {selectedPostedApplication && (
          <JobApplicationComments
            application={selectedPostedApplication}
            miw={300}
          />
        )}
        {!selectedPostedJob && postedJobs && (
          <Pagination
            value={postedJobs.currentPage}
            onChange={handleSetPageNumber}
            total={postedJobs.totalPages}
          />
        )}
      </Stack>
    </Paper>
  );
}
