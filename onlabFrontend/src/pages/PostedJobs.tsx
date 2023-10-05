import { ActionIcon, Group, Stack, Title, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobList from "../components/job-components/JobList";
import { useGetUserPostedJobs } from "../hooks/react-query/JobHooks";
import {
  DefaultJobFilterParticipant,
  JobFilterParticipant,
} from "../models/Job";

export default function OwnerProfile() {
  const [filter, setFilter] = useState(DefaultJobFilterParticipant);

  const navigate = useNavigate();

  const { jobs, error, loading, listJobs } = useGetUserPostedJobs(filter);

  useEffect(() => {
    listJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleSetFilter = (newFilter: JobFilterParticipant) => {
    setFilter(newFilter);
  };
  const handleAdd = () => {
    navigate("/createpetsitterjob");
  };
  return (
    <Stack align="center" justify="center">
      <Stack w="60%" justify="center">
        <Title align="center" order={2} mb={10}>
          Approvals
        </Title>
        {/* <JobApprovalList
          approvals={approvals}
          loading={approvalsLoading}
          error={approvalsError}
          refetch={listApprovals}
        /> */}

        <Group align="center" position="center" mb={3}>
          <Title align="center" order={2}>
            Posted jobs
          </Title>
          <Tooltip label="Post new job">
            <ActionIcon variant="subtle" color="dark" onClick={handleAdd}>
              <IconPlus />
            </ActionIcon>
          </Tooltip>
        </Group>
        <JobList
          jobs={jobs}
          loading={loading}
          error={error}
          refetch={listJobs}
        />
      </Stack>
    </Stack>
  );
}
