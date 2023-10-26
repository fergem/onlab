import {
  Accordion,
  ActionIcon,
  Group,
  Paper,
  Select,
  Stack,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconId, IconMoodSad } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetNonRepeatedPostedJobs } from "../../hooks/react-query/JobHooks";
import {
  DefaultJobFilterParticipant,
  JobFilterParticipantData,
  Status,
} from "../../models/Job";
import { JobChipIcon } from "../job-components/JobHomeFilter";
import JobStatusBadge from "../utility-components/JobStatusBadge";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import JobUserTable from "./AvailableJobUserTable";
import NonRepeatedPostedJobDetails from "./NonRepeatedPostedJobDetails";

export default function NonRepeatedSection() {
  const [filter, setFilter] = useState(DefaultJobFilterParticipant);
  const {
    nonRepeatableJobs,
    errorNonRepeatedJobs,
    nonRepeatedJobsLoading,
    listNonRepeatedJobs,
  } = useGetNonRepeatedPostedJobs(filter);
  const navigate = useNavigate();

  const handleSetStatus = (status: string) => {
    setFilter({ status: status as Status });
  };

  return (
    <Paper p="md" shadow="sm" withBorder>
      <Group align="center" position="apart" mb={10}>
        <Title align="center" order={2} ml={30}>
          One time jobs
        </Title>
        <Select
          w={120}
          value={filter.status}
          onChange={handleSetStatus}
          data={JobFilterParticipantData}
        />
      </Group>
      <LoadingBoundary
        withBorder={false}
        loading={nonRepeatedJobsLoading}
        error={errorNonRepeatedJobs}
        refetch={listNonRepeatedJobs}
      >
        <Accordion
          variant="separated"
          chevronPosition="left"
          multiple
          radius="md"
        >
          {nonRepeatableJobs.length === 0 && (
            <Stack align="center" justify="center" my={20}>
              <IconMoodSad size={150} />
              <Title order={3} size={30}>
                No jobs to show
              </Title>
            </Stack>
          )}
          {nonRepeatableJobs.map((s) => {
            const navigateToJob = () => {
              navigate(`/jobs/${s.id}`);
            };
            return (
              <Accordion.Item value={s.id.toString()} key={s.id}>
                <Accordion.Control>
                  <Group>
                    <Title order={3}>{s.title}</Title>
                    <JobChipIcon jobType={s.type} />
                    <Tooltip label="See details">
                      <ActionIcon onClick={navigateToJob} ml="auto">
                        <IconId />
                      </ActionIcon>
                    </Tooltip>
                    <JobStatusBadge status={s.status} />
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack>
                    <NonRepeatedPostedJobDetails job={s} />
                    <JobUserTable
                      jobApplications={s.jobApplications}
                      jobStatus={s.status}
                    />
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </LoadingBoundary>
    </Paper>
  );
}
