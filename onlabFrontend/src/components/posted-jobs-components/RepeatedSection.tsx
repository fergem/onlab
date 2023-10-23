import { Accordion, Group, Paper, Select, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { useGetRepeatedPostedJobs } from "../../hooks/react-query/JobHooks";
import {
  DefaultJobFilterParticipant,
  JobFilterParticipantData,
  Status,
} from "../../models/Job";
import JobStatusBadge from "../JobStatusBadge";
import { JobChipIcon } from "../job-components/JobHomeFilter";
import LoadingBoundary from "../utility-components/LoadingBoundary";
import JobUserTable from "./AvailableJobUserTable";
import RepeatedPostedJobDetails from "./RepeadtedPostedJobDetails";

export default function RepeatedSection() {
  const [filter, setFilter] = useState(DefaultJobFilterParticipant);
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
          {repeatableJobs.map((s) => (
            <Accordion.Item value={s.id.toString()} key={s.id}>
              <Accordion.Control>
                <Group>
                  <Title order={3}>{s.title}</Title>
                  <JobChipIcon jobType={s.type} />
                  <JobStatusBadge status={s.status} ml="auto" />
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
          ))}
        </Accordion>
      </LoadingBoundary>
    </Paper>
  );
}
