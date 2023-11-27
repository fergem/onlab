import { Accordion, Group, Paper, Select, Stack, Title } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { useGetUserUnderTookJobs } from "../../hooks/react-query/JobHooks";
import useJobAndApplicationFilter from "../../hooks/useJobAndApplicationFilter";
import { DefaultJobApplicationtData } from "../../models/Filters";
import { JobFilterParticipantData } from "../../models/Job";
import { JobChipIcon } from "../job-components/JobHomeFilter";
import JobApplicationStatusBadge from "../utility-components/JobApplicationStatusBadge";
import JobStatusBadge from "../utility-components/JobStatusBadge";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import RepeatedJobIcon from "../utility-components/RepeatedJobIcon";
import UndertookJobsDetails from "./UndertookJobsDetails";

export default function UndertookJobsSection() {
  const { filter, handleSetJobStatus, handleSetJobApplicationStatus } =
    useJobAndApplicationFilter();
  const { jobs, error, loading, listJobs } = useGetUserUnderTookJobs(filter);

  // const rows = jobsWithColor.map((job) => (
  //   <tr key={job.id}>
  //     <td>{job.title}</td>
  //     <td>{job.type}</td>
  //     <td>{job.location}</td>
  //     <td>{dayjs(job.startDate).format("YYYY-MM-DD")}</td>
  //     <td>{job.endDate ? dayjs(job.endDate).format("YYYY-MM-DD") : "-"}</td>
  //     <td>{job.days}</td>
  //   </tr>
  // ));
  return (
    <Paper p="md" shadow="sm" withBorder>
      <Group align="center" position="apart" mb={10}>
        <Title align="center" order={2} ml={30}>
          Undertook jobs
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
        >
          {jobs.map((s) => (
            <Accordion.Item value={s.id.toString()} key={s.id}>
              <Accordion.Control>
                <Group>
                  <Title order={3}>{s.title}</Title>
                  <JobChipIcon jobType={s.type} withTooltip />
                  {s.isRepeated && <RepeatedJobIcon />}
                  <JobStatusBadge status={s.status} />
                  <JobApplicationStatusBadge
                    status={s.applicationStatus}
                    ml="auto"
                  />
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <UndertookJobsDetails job={s} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </LoadingBoundary>
    </Paper>
  );
}
