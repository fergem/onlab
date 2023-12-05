import {
  Accordion,
  Group,
  Pagination,
  Paper,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useGetNonRepeatedPostedJobs } from "../../hooks/react-query/JobHooks";
import {
  DefaultJobFilterPostedAndApplied,
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
  const [filter, setFilter] = useState(DefaultJobFilterPostedAndApplied);
  const {
    nonRepeatableJobs,
    isErrorNonRepeatedJobs: errorNonRepeatedJobs,
    nonRepeatedJobsLoading,
    refetchNonRepeatedJobs,
  } = useGetNonRepeatedPostedJobs(filter);

  const handleSetStatus = (status: string) => {
    setFilter({ status: status as Status });
  };

  const handleSetPageNumber = (page: number) => {
    setFilter((prev) => ({ ...prev, pageNumber: page }));
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
        isLoading={nonRepeatedJobsLoading}
        isError={errorNonRepeatedJobs}
        refetch={refetchNonRepeatedJobs}
        isEmpty={nonRepeatableJobs && nonRepeatableJobs.data.length === 0}
        emptyMessage="No jobs to show yet. Consider adding one."
      >
        <Stack align="center">
          <Accordion
            variant="separated"
            chevronPosition="left"
            multiple
            radius="md"
            chevronSize={0}
            w="100%"
          >
            {nonRepeatableJobs &&
              nonRepeatableJobs.data.map((s) => {
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
          {nonRepeatableJobs && (
            <Pagination
              value={nonRepeatableJobs.currentPage}
              onChange={handleSetPageNumber}
              total={nonRepeatableJobs.totalPages}
            />
          )}
        </Stack>
      </LoadingBoundary>
    </Paper>
  );
}
