import {
  Accordion,
  Group,
  Pagination,
  Paper,
  Select,
  Stack,
  Title,
} from "@mantine/core";
import { useGetRepeatedPostedJobs } from "../../hooks/react-query/JobHooks";
import useJobAndApplicationFilter from "../../hooks/useJobAndApplicationFilter";
import { JobFilterParticipantData, Status } from "../../models/Job";
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
  const { filter, handleSetJobStatus, handleSetPageNumber } =
    useJobAndApplicationFilter();

  const {
    repeatableJobs,
    repeatableError,
    repeatableLoading,
    refetchRepeatableJobs,
  } = useGetRepeatedPostedJobs(filter);

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
          onChange={handleSetJobStatus}
          data={JobFilterParticipantData}
        />
      </Group>
      <LoadingBoundary
        isLoading={repeatableLoading}
        isError={repeatableError}
        refetch={refetchRepeatableJobs}
        isEmpty={repeatableJobs && repeatableJobs.data.length === 0}
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
            {repeatableJobs &&
              repeatableJobs.data.map((s) => {
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
                            <CanceljobButton
                              jobID={s.id}
                              jobStatus={s.status}
                            />
                          )}
                        </Group>
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                );
              })}
          </Accordion>
          {repeatableJobs && (
            <Pagination
              value={repeatableJobs.currentPage}
              onChange={handleSetPageNumber}
              total={repeatableJobs.totalPages}
            />
          )}
        </Stack>
      </LoadingBoundary>
    </Paper>
  );
}
