import { Accordion, Group, Paper, Select, Stack, Title } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { useState } from "react";
import { useGetRepeatedPostedJobs } from "../../hooks/react-query/JobHooks";
import {
  DefaultJobFilterDetails,
  JobFilterParticipantData,
  Status,
} from "../../models/Job";
import { JobApplicationStatus } from "../../models/JobApplication";
import { JobChipIcon } from "../job-components/JobHomeFilter";
import JobStatusBadge from "../utility-components/JobStatusBadge";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import ToJobDetailsIcon from "../utility-components/ToJobDetailsIcon";
import CanceljobButton from "./CancelJobButton";
import FinishJobButton from "./FinishJobButton";
import PostedJobApplicationTable from "./PostedJobApplicationTable";
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

  return (
    <Paper p="md" shadow="sm" withBorder>
      <Group align="center" position="apart" mb={10}>
        <Title align="center" order={2} ml={30}>
          Repeated jobs
        </Title>
        <Select
          mb={15}
          label="Job status"
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
          chevronSize={0}
        >
          {repeatableJobs.length === 0 && (
            <Stack align="center" justify="center" my={20}>
              <IconMoodSad size={100} />
              <Title order={3} size={20}>
                No jobs to show yet. Consider adding one.
              </Title>
            </Stack>
          )}
          {repeatableJobs.map((s) => {
            const areApplicationsShown = s.status !== Status.Canceled;
            const hasApproved = s.jobApplications.some(
              (k) => k.status === JobApplicationStatus.Approved
            );
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
                    <RepeatedPostedJobDetails job={s} />

                    <Group position="center" align="center">
                      {hasApproved ? (
                        <FinishJobButton
                          jobID={s.id}
                          jobStatus={s.status}
                          endDate={s.endDate}
                        />
                      ) : (
                        <CanceljobButton jobID={s.id} jobStatus={s.status} />
                      )}
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
