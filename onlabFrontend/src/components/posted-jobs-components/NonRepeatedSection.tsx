import { Accordion, Group, Paper, Select, Stack, Title } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { useState } from "react";
import { useGetNonRepeatedPostedJobs } from "../../hooks/react-query/JobHooks";
import {
  DefaultJobFilterDetails,
  JobFilterParticipantData,
  Status,
} from "../../models/Job";
import { JobChipIcon } from "../job-components/JobHomeFilter";
import JobStatusBadge from "../utility-components/JobStatusBadge";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import ToJobDetailsIcon from "../utility-components/ToJobDetailsIcon";
import CancelJobButton from "./CancelJobButton";
import FinishJobButton from "./FinishJobButton";
import NonRepeatedPostedJobDetails from "./NonRepeatedPostedJobDetails";
import PostedJobApplicationTable from "./PostedJobApplicationTable";

export default function NonRepeatedSection() {
  const [filter, setFilter] = useState(DefaultJobFilterDetails);
  const {
    nonRepeatableJobs,
    errorNonRepeatedJobs,
    nonRepeatedJobsLoading,
    listNonRepeatedJobs,
  } = useGetNonRepeatedPostedJobs(filter);

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
          label="Job status"
          mb={15}
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
          chevronSize={0}
        >
          {nonRepeatableJobs.length === 0 && (
            <Stack align="center" justify="center" my={20}>
              <IconMoodSad size={100} />
              <Title order={3} size={20}>
                No jobs to show yet. Consider adding one.
              </Title>
            </Stack>
          )}
          {nonRepeatableJobs.map((s) => {
            const areApplicationsShown = s.status !== Status.Canceled;
            return (
              <Accordion.Item value={s.id.toString()} key={s.id}>
                <Accordion.Control>
                  <Group>
                    <JobStatusBadge status={s.status} />
                    <Title order={5}>{s.title}</Title>
                    <Group ml="auto" spacing={10}>
                      <JobChipIcon jobType={s.type} withTooltip />
                      <ToJobDetailsIcon jobID={s.id} />
                    </Group>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack>
                    {areApplicationsShown && (
                      <PostedJobApplicationTable
                        jobApplications={s.jobApplications}
                        jobStatus={s.status}
                      />
                    )}
                    <NonRepeatedPostedJobDetails job={s} />

                    <Group position="center" align="center">
                      <FinishJobButton
                        jobID={s.id}
                        jobStatus={s.status}
                        endDate={s.endDate}
                      />
                      <CancelJobButton jobID={s.id} jobStatus={s.status} />
                    </Group>
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
