import {
  Accordion,
  Divider,
  Group,
  Paper,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { useGetUserApliedJobs as useGetUserAppliedJobs } from "../../hooks/react-query/JobHooks";
import useJobAndApplicationFilter from "../../hooks/useJobAndApplicationFilter";
import { DefaultJobApplicationtData } from "../../models/Filters";
import { JobFilterParticipantData, Status } from "../../models/Job";
import { JobApplicationStatus } from "../../models/JobApplication";
import { JobChipIcon } from "../job-components/JobHomeFilter";
import JobApplicationStatusBadge from "../utility-components/JobApplicationStatusBadge";
import JobStatusBadge from "../utility-components/JobStatusBadge";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import RepeatedJobIcon from "../utility-components/RepeatedJobIcon";
import ToJobDetailsIcon from "../utility-components/ToJobDetailsIcon";
import AppliedJobsDetails from "./AppliedJobsDetails";

export default function AppliedJobsSection() {
  const { filter, handleSetJobStatus, handleSetJobApplicationStatus } =
    useJobAndApplicationFilter();
  const { jobs, error, loading, listJobs } = useGetUserAppliedJobs(filter);

  return (
    <Paper p="md" shadow="sm" withBorder>
      <Group align="center" position="apart" mb={10}>
        <Title align="center" order={2} ml={30}>
          Applied jobs
        </Title>
        <Group align="center">
          <Select
            label="Job status"
            mb={15}
            value={filter.jobStatus}
            onChange={handleSetJobStatus}
            data={JobFilterParticipantData}
          />
          <Select
            label="Application status"
            mb={15}
            value={filter.jobApplicationStatus}
            onChange={handleSetJobApplicationStatus}
            data={DefaultJobApplicationtData}
          />
        </Group>
      </Group>
      <LoadingBoundary
        loading={loading}
        error={error}
        refetch={listJobs}
        withBorder={false}
      >
        {jobs.length === 0 && (
          <Stack align="center" justify="center" my={20}>
            <IconMoodSad size={150} />
            <Title order={3} size={30}>
              No jobs to show
            </Title>
          </Stack>
        )}
        <Accordion
          variant="separated"
          chevronPosition="left"
          multiple
          radius="md"
          chevronSize={0}
        >
          {jobs.map((s) => (
            <Accordion.Item value={s.id.toString()} key={s.id}>
              <Accordion.Control>
                <Group>
                  <Stack spacing={3}>
                    {s.applicationStatus !==
                      JobApplicationStatus.NotApproved && (
                      <JobStatusBadge status={s.status} />
                    )}
                    {s.status !== Status.Canceled && (
                      <JobApplicationStatusBadge status={s.applicationStatus} />
                    )}
                  </Stack>
                  <Title order={5}>{s.title}</Title>
                  <Divider />
                  <Group ml="auto" spacing={10}>
                    {s.isRepeated && <RepeatedJobIcon />}
                    <JobChipIcon jobType={s.type} withTooltip />
                    <ToJobDetailsIcon jobID={s.id} />
                  </Group>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <AppliedJobsDetails job={s} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </LoadingBoundary>
    </Paper>
  );
}
