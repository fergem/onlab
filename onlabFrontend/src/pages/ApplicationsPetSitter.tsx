import { Group, Paper, ScrollArea, Select, Stack, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import Messagebar from "../components/job-components/Messagebar";
import JobApplicationComments from "../components/job-components/comment-section/JobApplicationComments";
import LoadingBoundary from "../components/utility-components/LoadingBoundary";
import { useJobApplicationsUserAppliedTo } from "../hooks/react-query/JobApplicationHooks";
import {
  DefaultJobFilterParticipant,
  JobFilterParticipantData,
  Status,
} from "../models/Job";

export default function ApplicationsPetSitter() {
  const [filter, setFilter] = useState(DefaultJobFilterParticipant);

  const handleSetStatus = (status: string) => {
    setFilter({ status: status as Status });
  };

  const { appliedJobs, error, loading, listAppliedJobs } =
    useJobApplicationsUserAppliedTo(filter);

  const [selectedApplicationID, setSelectedApplicationID] = useState<
    number | undefined
  >(undefined);

  const appliedJob = useMemo(() => {
    return appliedJobs.find((s) => s.id === selectedApplicationID);
  }, [appliedJobs, selectedApplicationID]);

  const handleSetSelected = (applicationID: number) =>
    setSelectedApplicationID(applicationID);

  return (
    <Stack align="center" h="100%" justify="center">
      <Paper p="md" shadow="sm" withBorder>
        <Group>
          <Select
            value={filter.status}
            onChange={handleSetStatus}
            data={JobFilterParticipantData}
          />
          <Title order={2} align="center" mb={20}>
            {appliedJob
              ? appliedJob.jobTitle
              : "Chat with the people, who's job you applied to"}
          </Title>
        </Group>

        <Group>
          <ScrollArea w={200} h={400}>
            <LoadingBoundary
              loading={loading}
              error={error}
              refetch={listAppliedJobs}
            >
              <Stack>
                {appliedJobs.map((s) => (
                  <Messagebar
                    appliedJob={s}
                    key={s.id}
                    selected={s.id === selectedApplicationID}
                    select={handleSetSelected}
                  />
                ))}
              </Stack>
            </LoadingBoundary>
          </ScrollArea>
          {appliedJob && <JobApplicationComments application={appliedJob} />}
        </Group>
      </Paper>
    </Stack>
  );
}
