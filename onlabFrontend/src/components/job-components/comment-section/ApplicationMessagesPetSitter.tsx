/* eslint-disable react/no-unescaped-entities */
import {
  ActionIcon,
  Group,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useJobApplicationsUserAppliedTo } from "../../../hooks/react-query/JobApplicationHooks";
import useJobAndApplicationFilter from "../../../hooks/useJobAndApplicationFilter";
import { DefaultJobApplicationtData } from "../../../models/Filters";
import { JobFilterParticipantData } from "../../../models/Job";
import LoadingBoundary from "../../utility-components/LoadingBoundary";
import Messagebar from "../Messagebar";
import JobApplicationComments from "./JobApplicationComments";

export default function ApplicationMessagesPetSitter() {
  const { filter, handleSetJobStatus, handleSetJobApplicationStatus } =
    useJobAndApplicationFilter();

  const { appliedJobs, error, loading, listAppliedJobs } =
    useJobApplicationsUserAppliedTo(filter);

  const [selectedApplicationID, setSelectedApplicationID] = useState<
    number | undefined
  >();

  const appliedJob = useMemo(() => {
    return appliedJobs.find((s) => s.id === selectedApplicationID);
  }, [appliedJobs, selectedApplicationID]);

  const handleSetSelected = (applicationID: number) =>
    setSelectedApplicationID(applicationID);

  const handleBack = () => {
    setSelectedApplicationID(undefined);
  };

  return (
    <Stack align="center" h="100%" justify="center">
      <Paper p="md" shadow="sm" withBorder>
        {!appliedJob && (
          <Group align="center" noWrap mb={15}>
            <Select
              label="Job status"
              value={filter.jobStatus}
              onChange={handleSetJobStatus}
              data={JobFilterParticipantData}
            />
            <Select
              label="Application status"
              value={filter.jobApplicationStatus}
              onChange={handleSetJobApplicationStatus}
              data={DefaultJobApplicationtData}
            />
          </Group>
        )}
        <Group>
          {appliedJob ? (
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
                {appliedJob.jobTitle}
              </Title>
            </Group>
          ) : (
            <Title order={4} align="center" mb={20}>
              Chat with the people, who's job you applied to
            </Title>
          )}
        </Group>

        {!appliedJob && (
          <ScrollArea h="40rem">
            <LoadingBoundary
              loading={loading}
              error={error}
              refetch={listAppliedJobs}
              withBorder={false}
            >
              <Stack spacing={0}>
                {appliedJobs.map((s) => (
                  <Messagebar
                    appliedJob={s}
                    key={s.id}
                    select={handleSetSelected}
                  />
                ))}
              </Stack>
            </LoadingBoundary>
          </ScrollArea>
        )}
        {appliedJob && (
          <JobApplicationComments application={appliedJob} miw={300} />
        )}
      </Paper>
    </Stack>
  );
}
