import { Accordion, Group, Paper, Select, Stack, Title } from "@mantine/core";
import { useState } from "react";
import { useGetNonRepeatedPostedJobs } from "../../hooks/react-query/JobHooks";
import {
  DefaultJobFilterParticipant,
  JobFilterParticipantData,
  Status,
} from "../../models/Job";
import JobStatusBadge from "../JobStatusBadge";
import { JobChipIcon } from "../job-components/JobHomeFilter";
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
          {nonRepeatableJobs.map((s) => (
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
                  <NonRepeatedPostedJobDetails job={s} />
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
