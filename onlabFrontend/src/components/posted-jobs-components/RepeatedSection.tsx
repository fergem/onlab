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
import { useGetRepeatedPostedJobs } from "../../hooks/react-query/JobHooks";
import {
  DefaultJobFilterDetails,
  JobFilterParticipantData,
  Status,
} from "../../models/Job";
import { JobChipIcon } from "../job-components/JobHomeFilter";
import JobStatusBadge from "../utility-components/JobStatusBadge";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import JobUserTable from "./AvailableJobUserTable";
import RepeatedPostedJobDetails from "./RepeadtedPostedJobDetails";

export default function RepeatedSection() {
  const [filter, setFilter] = useState(DefaultJobFilterDetails);
  const {
    repeatableJobs,
    repeatableError,
    repeatableLoading,
    listRepeatableJobs,
  } = useGetRepeatedPostedJobs(filter);

  const handleSetStatus = (status: string) => {
    setFilter({ status: status as Status });
  };
  const navigate = useNavigate();

  return (
    <Paper p="md" shadow="sm" withBorder>
      <Group align="center" position="apart" mb={10}>
        <Title align="center" order={2} ml={30}>
          Repeated jobs
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
        loading={repeatableLoading}
        error={repeatableError}
        refetch={listRepeatableJobs}
      >
        <Accordion
          variant="separated"
          chevronPosition="left"
          multiple
          radius="md"
        >
          {repeatableJobs.length === 0 && (
            <Stack align="center" justify="center" my={20}>
              <IconMoodSad size={150} />
              <Title order={3} size={30}>
                No jobs to show
              </Title>
            </Stack>
          )}
          {repeatableJobs.map((s) => {
            const navigateToJob = () => {
              navigate(`/jobs/${s.id}`);
            };
            return (
              <Accordion.Item value={s.id.toString()} key={s.id}>
                <Accordion.Control>
                  <Group>
                    <Title order={3}>{s.title}</Title>
                    <JobChipIcon jobType={s.type} withTooltip />
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
                    <RepeatedPostedJobDetails job={s} />
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
